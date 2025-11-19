#!/usr/bin/env python3
"""
Prerna Opportunity Scraper (final updated)

Schema stored in MongoDB (collection "opportunities"):
    id, title, type, age_min, age_max, interest,
    region, description, image_url, feature_text, score, link

Includes:
 - MyGov scraper (RSS feed) — reliable, no-JS
 - GirlsWhoCode scraper (sitemap.xml) — reliable, no-JS
 - GenericScraper for arbitrary links
 - Robust age extraction and normalization
 - robots.txt respect, delays, retries
"""
########### Future scope(real data fetching)
import time
import hashlib
import logging
import requests
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
import urllib.robotparser
from pymongo import MongoClient
import re
import xml.etree.ElementTree as ET

# -----------------------------
# CONFIG
# -----------------------------
MONGO_URI = "mongodb+srv://dubeytanisha66_db_user:Tanisha@cluster0.rh9e4xv.mongodb.net/"
DB_NAME = "prerna"
COLLECTION_NAME = "opportunities"

USER_AGENT = "PrernaOpportunityScraper/1.0 (+https://example.org)"
DELAY = 1.5           # seconds between requests to same host
TIMEOUT = 15          # request timeout
MAX_RETRIES = 2       # number of retries on transient failures
LOG_LEVEL = logging.INFO

# -----------------------------
# Logging config
# -----------------------------
logging.basicConfig(
    format="%(asctime)s [%(levelname)s] %(message)s",
    level=LOG_LEVEL
)

# -----------------------------
# Database (Mongo)
# -----------------------------
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
col = db[COLLECTION_NAME]

# ensure unique id
try:
    col.create_index("id", unique=True)
except Exception as e:
    logging.warning(f"Index creation warning: {e}")

# -----------------------------
# Utilities
# -----------------------------
def make_id(link: str) -> str:
    """Create short stable id from link."""
    return hashlib.sha1(link.encode("utf-8")).hexdigest()[:12]

def text(el):
    """Safe text extraction from BS element."""
    if not el:
        return ""
    if hasattr(el, "get_text"):
        return el.get_text(" ", strip=True)
    return str(el).strip()

def safe_join(a, b):
    if not a:
        return b or ""
    if not b:
        return a
    return a + " " + b

# Age extraction helper (robust)
def extract_age_range(text_block: str):
    """
    Attempts to extract (age_min, age_max) from free text.
    Returns (int|None, int|None)
    """
    if not text_block:
        return None, None
    tb = text_block.lower()
    tb = tb.replace("–", "-").replace("—", "-").replace("−", "-")

    # 1) explicit ranges: 12-18 or 12 to 18
    m = re.search(r'(?<!\d)(\d{1,2})\s*(?:-|to|\u2013|\u2014|\u2012|\sto\s)\s*(\d{1,2})(?!\d)', tb)
    if m:
        a, b = int(m.group(1)), int(m.group(2))
        if a > b:
            a, b = b, a
        return a, b

    # 2) aged 12 to 18
    m = re.search(r'aged\s*(\d{1,2})\s*(?:-|to)\s*(\d{1,2})', tb)
    if m:
        a, b = int(m.group(1)), int(m.group(2))
        if a > b:
            a, b = b, a
        return a, b

    # 3) between 10 and 12
    m = re.search(r'between\s*(\d{1,2})\s*and\s*(\d{1,2})', tb)
    if m:
        a, b = int(m.group(1)), int(m.group(2))
        if a > b:
            a, b = b, a
        return a, b

    # 4) age 18+ or 18+
    m = re.search(r'age[s]?\s*(\d{1,2})\s*\+', tb)
    if m:
        return int(m.group(1)), None
    m = re.search(r'(?<!\d)(\d{1,2})\s*\+\s*(?:years|yrs|y)?', tb)
    if m:
        return int(m.group(1)), None

    # 5) minimum / at least
    m = re.search(r'(?:minimum|min(?:imum)? age|at least)\s*(?:of\s*)?(\d{1,2})', tb)
    if m:
        return int(m.group(1)), None
    m = re.search(r'must be\s*(\d{1,2})\s*years?', tb)
    if m:
        return int(m.group(1)), None

    # 6) up to / maximum
    m = re.search(r'(?:up to|upto|maximum|max(?:imum)? age)\s*(\d{1,2})', tb)
    if m:
        return None, int(m.group(1))

    return None, None

# basic interest extraction by meta tags or keywords
def extract_interest(soup):
    # try meta keywords / description for interest words
    keywords = soup.select_one("meta[name='keywords']")
    if keywords and keywords.get("content"):
        return keywords.get("content").strip()
    # fallback: meta description
    desc = soup.select_one("meta[name='description']")
    if desc and desc.get("content"):
        words = re.findall(r"[A-Za-z]{3,}", desc.get("content"))
        tags = ",".join(list(dict.fromkeys(words[:8])))
        return tags
    # fallback: look for tag lists
    tag_els = soup.select("[class*='tag'], [class*='keyword'], .tags a, .field--name-field-tags a")
    tags = []
    for t in tag_els[:10]:
        v = t.get_text(strip=True)
        if v:
            tags.append(v)
    return ",".join(tags)

def extract_image_url(soup, base_url):
    # prefer og:image
    og = soup.select_one("meta[property='og:image']")
    if og and og.get("content"):
        return urljoin(base_url, og.get("content"))
    # twitter image
    tw = soup.select_one("meta[name='twitter:image']")
    if tw and tw.get("content"):
        return urljoin(base_url, tw.get("content"))
    # first large <img>
    imgs = soup.select("img")
    best = ""
    best_area = 0
    for img in imgs:
        src = img.get("src") or img.get("data-src")
        if not src:
            continue
        w = img.get("width") or img.get("data-width") or 0
        h = img.get("height") or img.get("data-height") or 0
        try:
            w = int(w)
            h = int(h)
        except:
            w = 0
            h = 0
        area = w * h
        if area > best_area:
            best_area = area
            best = src
    if best:
        return urljoin(base_url, best)
    if imgs and imgs[0].get("src"):
        return urljoin(base_url, imgs[0].get("src"))
    return ""

# -----------------------------
# Robots Checker
# -----------------------------
class RobotsChecker:
    cache = {}
    @classmethod
    def allowed(cls, url):
        parsed = urlparse(url)
        base = f"{parsed.scheme}://{parsed.netloc}"
        if base not in cls.cache:
            rp = urllib.robotparser.RobotFileParser()
            rp.set_url(urljoin(base, "/robots.txt"))
            try:
                rp.read()
                cls.cache[base] = rp
            except Exception:
                cls.cache[base] = None
        rp = cls.cache.get(base)
        if rp is None:
            return True
        return rp.can_fetch(USER_AGENT, url)

# -----------------------------
# HTTP session with retries
# -----------------------------
session = requests.Session()
session.headers.update({"User-Agent": USER_AGENT})

def fetch_html(url, last_request_time):
    """
    Fetch HTML with delay and minimal retries.
    Returns (soup, last_request_time) or (None, last_request_time)
    """
    if not RobotsChecker.allowed(url):
        logging.warning(f"Blocked by robots.txt: {url}")
        return None, last_request_time

    elapsed = time.time() - last_request_time
    if elapsed < DELAY:
        time.sleep(max(0, DELAY - elapsed))

    attempts = 0
    while attempts <= MAX_RETRIES:
        attempts += 1
        try:
            r = session.get(url, timeout=TIMEOUT)
            last_request_time = time.time()
            # accept HTML-like responses
            ct = r.headers.get('Content-Type', '')
            if r.status_code == 200 and ('text' in ct or 'html' in ct or 'xml' in ct):
                return BeautifulSoup(r.text, "html.parser"), last_request_time
            else:
                logging.debug(f"Non-HTML or status {r.status_code} for {url} (Content-Type: {ct})")
                return None, last_request_time
        except requests.RequestException as e:
            logging.warning(f"Request error {url} attempt {attempts}: {e}")
            if attempts > MAX_RETRIES:
                return None, last_request_time
            time.sleep(1.0 * attempts)
    return None, last_request_time

def fetch_raw(url, last_request_time):
    """
    Fetch raw content (useful for RSS / sitemap). Returns (bytes|None, last_request_time)
    """
    if not RobotsChecker.allowed(url):
        logging.warning(f"Blocked by robots.txt: {url}")
        return None, last_request_time

    elapsed = time.time() - last_request_time
    if elapsed < DELAY:
        time.sleep(max(0, DELAY - elapsed))

    attempts = 0
    while attempts <= MAX_RETRIES:
        attempts += 1
        try:
            r = session.get(url, timeout=TIMEOUT)
            last_request_time = time.time()
            if r.status_code == 200:
                return r.content, last_request_time
            else:
                logging.debug(f"Raw fetch non-200 {r.status_code} for {url}")
                return None, last_request_time
        except requests.RequestException as e:
            logging.warning(f"Raw request error {url} attempt {attempts}: {e}")
            if attempts > MAX_RETRIES:
                return None, last_request_time
            time.sleep(1.0 * attempts)
    return None, last_request_time

# -----------------------------
# Normalize schema
# -----------------------------
def normalize_fields(data: dict):
    """
    Ensure our final document has consistent fields.
    Also auto-detect age from title+description if not present.
    """
    fulltext = (data.get("title", "") or "") + " " + (data.get("description", "") or "")
    detected_min, detected_max = extract_age_range(fulltext)

    if data.get("age_min") in (None, "", 0):
        data["age_min"] = detected_min
    if data.get("age_max") in (None, "", 0):
        data["age_max"] = detected_max

    template = {
        "id": "",
        "title": "",
        "type": "",       # e.g., 'program','scholarship','event','internship'
        "age_min": None,
        "age_max": None,
        "interest": "",
        "region": "",
        "description": "",
        "image_url": "",
        "feature_text": "",
        "score": 0,
        "link": ""
    }
    template.update({k: v for k, v in data.items() if k in template})
    return template

# -----------------------------
# Base SiteScraper
# -----------------------------
class SiteScraper:
    def __init__(self, name, base_url=None):
        self.name = name
        self.base_url = base_url or ""
        self.last_request_time = 0

    def discover_pages(self, limit=100):
        return []

    def parse_page(self, url, soup):
        raise NotImplementedError

    def fetch(self, url):
        soup, self.last_request_time = fetch_html(url, self.last_request_time)
        return soup

# -----------------------------
# MyGov Scraper (RSS-based)
# -----------------------------
class MyGovScraper(SiteScraper):
    def __init__(self):
        super().__init__("MyGov", "https://www.mygov.in")

    def discover_pages(self, limit=100):
        pages = []
        rss_url = "https://www.mygov.in/opportunity/all/rss"
        content, self.last_request_time = fetch_raw(rss_url, self.last_request_time)
        if not content:
            logging.warning("MyGov RSS fetch failed or empty.")
            return pages

        try:
            root = ET.fromstring(content)
        except Exception as e:
            logging.warning(f"MyGov RSS parse error: {e}")
            return pages

        for item in root.findall(".//item"):
            link_el = item.find("link")
            if link_el is not None and link_el.text:
                pages.append(link_el.text.strip())
            if len(pages) >= limit:
                break

        logging.info(f"MyGov discovered {len(pages)} pages via RSS")
        return pages[:limit]

    def parse_page(self, url, soup):
        # soup should be HTML of the opportunity page
        title = text(soup.select_one("h1.page-title")) or text(soup.select_one("h1"))
        if not title:
            return None
        description = ""
        desc_el = soup.select_one("div.field--name-body") or soup.select_one(".node__content")
        if desc_el:
            description = desc_el.get_text(" ", strip=True)
        image_url = extract_image_url(soup, self.base_url)
        tags = ",".join([t.get_text(strip=True) for t in soup.select(".field--name-field-tags a")])
        data = {
            "id": make_id(url),
            "title": title,
            "type": "event",
            "age_min": None,
            "age_max": None,
            "interest": tags,
            "region": "India",
            "description": description,
            "image_url": image_url,
            "feature_text": "",
            "score": 0,
            "link": url
        }
        return normalize_fields(data)

# -----------------------------
# GirlsWhoCode Scraper (sitemap-based)
# -----------------------------
class GirlsWhoCodeScraper(SiteScraper):
    def __init__(self):
        super().__init__("GirlsWhoCode", "https://girlswhocode.com")

    def discover_pages(self, limit=100):
        pages = []
        sitemap_url = "https://girlswhocode.com/sitemap.xml"
        content, self.last_request_time = fetch_raw(sitemap_url, self.last_request_time)
        if not content:
            logging.warning("GirlsWhoCode sitemap fetch failed or empty.")
            return pages

        try:
            root = ET.fromstring(content)
        except Exception as e:
            logging.warning(f"GirlsWhoCode sitemap parse error: {e}")
            return pages

        urls = []
        for loc in root.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}loc"):
            if loc is not None and loc.text:
                urls.append(loc.text.strip())
        # fallback if namespace not present
        if not urls:
            for loc in root.findall(".//loc"):
                if loc is not None and loc.text:
                    urls.append(loc.text.strip())

        # filter program pages
        for u in urls:
            if "/programs/" in u and not u.rstrip().endswith("/programs"):
                pages.append(u)
            if len(pages) >= limit:
                break

        logging.info(f"GirlsWhoCode discovered {len(pages)} pages via sitemap")
        return pages[:limit]

    def parse_page(self, url, soup):
        title = text(soup.select_one("h1")) or text(soup.select_one(".entry-title"))
        if not title:
            return None
        meta_desc = soup.select_one("meta[name='description']")
        description = meta_desc.get("content", "").strip() if meta_desc and meta_desc.get("content") else ""
        if not description:
            # fallback to big text block
            description = text(soup.select_one(".entry-content")) or text(soup.select_one(".post-content"))
        image_url = extract_image_url(soup, self.base_url)
        data = {
            "id": make_id(url),
            "title": title,
            "type": "program",
            "age_min": None,
            "age_max": None,
            "interest": "Technology, Coding",
            "region": "Global",
            "description": description,
            "image_url": image_url,
            "feature_text": "",
            "score": 0,
            "link": url
        }
        return normalize_fields(data)

# -----------------------------
# GenericScraper: works for arbitrary links
# -----------------------------
class GenericScraper(SiteScraper):
    def __init__(self):
        super().__init__("Generic", "")

    def parse_page(self, url, soup):
        title = ""
        for sel in ["h1", "title", ".entry-title", ".post-title", "header h1"]:
            el = soup.select_one(sel)
            if el and text(el):
                title = text(el)
                break
        if not title:
            mt = soup.select_one("meta[property='og:title']") or soup.select_one("meta[name='title']")
            if mt and mt.get("content"):
                title = mt.get("content").strip()
        if not title:
            return None

        desc = ""
        meta_desc = soup.select_one("meta[name='description']") or soup.select_one("meta[property='og:description']")
        if meta_desc and meta_desc.get("content"):
            desc = meta_desc.get("content").strip()
        else:
            paras = soup.select("article p, .post-content p, .entry-content p, p")
            best = ""
            best_len = 0
            for p in paras[:12]:
                t = text(p)
                if len(t) > best_len:
                    best_len = len(t)
                    best = t
            desc = best

        image_url = extract_image_url(soup, url)
        interest = extract_interest(soup)

        parsed = urlparse(url)
        tld = parsed.netloc.split(".")[-1].lower() if parsed.netloc else ""
        region = ""
        if tld in ("in", "uk", "us", "au", "ca", "nz", "ie"):
            region_map = {"in": "India", "uk": "United Kingdom", "us": "United States",
                          "au": "Australia", "ca": "Canada", "nz": "New Zealand", "ie": "Ireland"}
            region = region_map.get(tld, "")

        lower = (title + " " + desc + " " + interest).lower()
        item_type = "opportunity"
        if any(k in lower for k in ["scholarship", "fellowship", "grant"]):
            item_type = "scholarship"
        elif any(k in lower for k in ["intern", "internship", "work experience"]):
            item_type = "internship"
        elif any(k in lower for k in ["event", "webinar", "workshop", "conference"]):
            item_type = "event"
        elif any(k in lower for k in ["program", "course", "bootcamp"]):
            item_type = "program"

        data = {
            "id": make_id(url),
            "title": title,
            "type": item_type,
            "age_min": None,
            "age_max": None,
            "interest": interest,
            "region": region,
            "description": desc,
            "image_url": image_url,
            "feature_text": "",
            "score": 0,
            "link": url
        }
        return normalize_fields(data)

# -----------------------------
# Main runner
# -----------------------------
def run_scraper(limit=2000, pages_per_site=200, extra_links=None):
    """
    Run all scrapers and insert into Mongo.
    extra_links: list of arbitrary URLs to fetch with GenericScraper.
    """
    scrapers = [
        MyGovScraper(),
        GirlsWhoCodeScraper(),
        # add more site-specific scrapers here if you want
    ]

    generic = GenericScraper()
    total = 0

    for scraper in scrapers:
        logging.info(f"Starting scraper: {scraper.name}")
        pages = []
        try:
            pages = scraper.discover_pages(limit=pages_per_site)
        except Exception as e:
            logging.warning(f"{scraper.name} discover_pages failed: {e}")
            pages = []

        logging.info(f"Found {len(pages)} pages in {scraper.name}")

        # process pages
        for url in pages:
            if total >= limit:
                logging.info("Reached overall limit.")
                return
            soup = scraper.fetch(url)
            if not soup:
                logging.debug(f"Failed to fetch detail page: {url}")
                continue
            try:
                data = scraper.parse_page(url, soup)
            except Exception as e:
                logging.warning(f"parse_page error {url}: {e}")
                continue
            if not data:
                logging.debug(f"parse_page returned no data for {url}")
                continue
            try:
                col.update_one({"id": data["id"]}, {"$set": data}, upsert=True)
                total += 1
                logging.info(f"[Saved] {data.get('title')} ({data.get('link')})")
            except Exception as e:
                logging.warning(f"MongoDB error saving {url}: {e}")

    # process any extra links via GenericScraper
    if extra_links:
        logging.info(f"Processing {len(extra_links)} extra link(s) with GenericScraper...")
        last_request_time = 0
        for url in extra_links:
            if total >= limit:
                logging.info("Reached overall limit.")
                return
            raw, last_request_time = fetch_raw(url, last_request_time)
            if not raw:
                logging.debug(f"Generic raw fetch failed: {url}")
                continue
            soup = BeautifulSoup(raw, "html.parser")
            try:
                data = generic.parse_page(url, soup)
            except Exception as e:
                logging.warning(f"Generic parse error {url}: {e}")
                continue
            if not data:
                logging.debug(f"Generic parse returned no data for {url}")
                continue
            try:
                col.update_one({"id": data["id"]}, {"$set": data}, upsert=True)
                total += 1
                logging.info(f"[Saved Generic] {data.get('title')} ({data.get('link')})")
            except Exception as e:
                logging.warning(f"MongoDB error saving generic {url}: {e}")

    logging.info(f"Scraping finished. Total saved/updated: {total}")

# -----------------------------
# __main__
# -----------------------------
if __name__ == "__main__":
    # Add any specific URLs you want processed by GenericScraper here
    extras = [
        # e.g. "https://example.org/scholarship-2025",
    ]
    run_scraper(limit=2000, pages_per_site=200, extra_links=extras)
