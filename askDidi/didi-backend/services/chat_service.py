import re
from config.db import profiles_collection, history_collection
from services.gemini_service import ask_gemini

def get_user_profile(user_id):
    return profiles_collection.find_one({"user_id": user_id}) or {}

def get_chat_history(user_id):
    record = history_collection.find_one({"user_id": user_id})
    return record["messages"] if record else []

def save_chat_message(user_id, role, text):
    history_collection.update_one(
        {"user_id": user_id},
        {"$push": {"messages": {"role": role, "text": text}}},
        upsert=True
    )

def reset_history(user_id):
    history_collection.delete_one({"user_id": user_id})


def build_prompt(profile, history, user_msg):
    prompt = f"""
<system>
आप भारत की ग्रामीण महिलाओं की सहायता करने वाली एक AI सलाहकार हैं।

🎯 आपका लक्ष्य:
- सरल, दोस्ताना और समझने योग्य हिंदी में मदद देना।
- कभी भी कठिन या भारी शब्दों का प्रयोग नहीं करना।
- जवाब 30 सेकंड के अंदर समझ आने लायक होना चाहिए।

❗ कड़े नियम:
1. उत्तर सिर्फ और सिर्फ **हिंदी** में देना है।
2. एक भी अंग्रेज़ी शब्द नहीं लिखना है।
3. Hinglish (English letters Hindi words) भी नहीं लिखना है।
4. आसान शब्दों में, छोटे वाक्यों में जवाब देना है।
5. हिन्दी के अलावा किसी भाषा में उत्तर नहीं देना है।
</system>

<user_profile>
{profile}
</user_profile>

<conversation_history>
{ "".join(f"{msg['role'].capitalize()}: {msg['text']}\n" for msg in history) }
</conversation_history>

<user_message>
{user_msg}
</user_message>

<task>
उपरोक्त सभी नियमों का पालन करते हुए,
- केवल हिंदी में,
- आसान भाषा में,
- ग्रामीण महिलाओं के लिए समझ में आने योग्य,
- छोटा और सहायक उत्तर लिखिए।
</task>
<final_rule>
अगर आपके उत्तर में एक भी अंग्रेज़ी शब्द होगा तो वह गलत माना जाएगा।
इसलिए केवल हिंदी में ही उत्तर दीजिए।
</final_rule>
<response>

<response>
"""
    return prompt


def remove_english_sentences(text):
    cleaned = []

    # Split by sentence boundaries: । . ! ?
    sentences = re.split(r'(?<=[।.!?])\s*', text)

    for sentence in sentences:
        # Sentence contains any Hindi letter?
        if re.search(r'[\u0900-\u097F]', sentence):
            cleaned.append(sentence)   # KEEP
        else:
            # If sentence contains no Hindi letters → it's English → REMOVE
            continue

    return " ".join(cleaned).strip()

#returns to process_chat in stt_routes
def process_chat(user_id, message):
    profile = get_user_profile(user_id)
    history = get_chat_history(user_id)

    save_chat_message(user_id, "user", message)

    prompt = build_prompt(profile, history, message)
    answer = ask_gemini(prompt) #response.text from gemini_service

     # CLEAN OUT FULL ENGLISH SENTENCES
    final_answer = remove_english_sentences(answer)
    save_chat_message(user_id, "assistant", final_answer)

    return final_answer #to stt_routes
