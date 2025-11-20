import User from "../models/authUser.models.js";
import OtpStore from "../models/otp.models.js";
import axios from "axios";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

/* =========================================================
   📌 HELPER → REMOVE PASSWORD BEFORE SENDING USER
========================================================= */
const sanitizeUser = (user) => {
  if (!user) return null;
  const { password, __v, ...clean } = user.toObject();
  return clean;
};

/* =========================================================
   📌 PHONE LOGIN (PASSWORD BASED)
========================================================= */
export const phoneLogin = async (req, res) => {
  try {
    const { phonenumber, password } = req.body;

    if (!phonenumber || !password) {
      return res.status(400).json({ message: "Phone number and password required" });
    }

    const user = await User.findOne({ phonenumber });
    if (!user) {
      return res.status(400).json({ message: "User not found. Please signup first." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password or credentials." });
    }

    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    // 🔥 return sanitized (full) user data
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: sanitizeUser(user)
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error during login",
      error: error.message
    });
  }
};


/* =========================================================
   📌 PHONE SIGNUP (PASSWORD BASED)
========================================================= */
export const phoneSignup = async (req, res) => {
  try {
    const { fullname, phonenumber, password, address, interest, age, language } = req.body;

    if (!fullname || !phonenumber || !password) {
      return res.status(400).json({ message: "Full name, phone number & password required" });
    }

    if (phonenumber.length !== 10 || !/^\d{10}$/.test(phonenumber)) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existing = await User.findOne({ phonenumber });
    if (existing) {
      return res.status(400).json({ message: "Phone number already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      phonenumber,
      password: hashedPassword,
      address,
      interest,
      age,
      language
    });

    await newUser.save();

    const token = jsonwebtoken.sign(
      { id: newUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    // 🔥 return sanitized user
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: sanitizeUser(newUser)
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


/* =========================================================
   📌 SEND OTP
========================================================= */
export const sendOtp = async (req, res) => {
  try {
    const { phonenumber } = req.body;

    if (!phonenumber || phonenumber.length !== 10 || !/^\d{10}$/.test(phonenumber)) {
      return res.status(400).json({ success: false, message: "Invalid phone number" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    await OtpStore.create({
      phonenumber,
      otp: hashedOtp,
      createdAt: Date.now()
    });

    // SMS API Call
    await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",
        message: `Your OTP is ${otp}`,
        language: "english",
        numbers: [phonenumber]
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ success: true, message: "OTP sent successfully" });

  } catch (error) {
    res.status(500).json({
      message: "Failed to send OTP",
      error: error.response?.data || error.message
    });
  }
};


/* =========================================================
   📌 VERIFY OTP → LOGIN OR CREATE USER
========================================================= */
export const verifyOtp = async (req, res) => {
  try {
    const { phonenumber, otp, fullname } = req.body;

    const record = await OtpStore.findOne({ phonenumber }).sort({ createdAt: -1 });

    if (!record) {
      return res.status(400).json({ success: false, message: "OTP not found or expired" });
    }

    if (Date.now() - record.createdAt > 5 * 60 * 1000) {
      await OtpStore.deleteMany({ phonenumber });
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    const isMatch = await bcrypt.compare(otp.toString(), record.otp);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    await OtpStore.deleteMany({ phonenumber });

    let user = await User.findOne({ phonenumber });

    if (!user) {
      user = new User({
        fullname: fullname || "User",
        phonenumber,
      });
      await user.save();
    }

    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    // 🔥 Full sanitized user returned
    res.json({
      success: true,
      message: "OTP verified successfully",
      token,
      user: sanitizeUser(user)
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error while verifying OTP",
      error: error.message
    });
  }
};
