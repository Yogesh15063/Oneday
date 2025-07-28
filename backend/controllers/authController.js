import generateOTP from "../utils/generateOTP.js";
import jwt from "jsonwebtoken";

// In-memory store for OTPs and users (temporary, for development)
const OTP_STORE = new Map();
const OTP_EXPIRY_MINUTES = parseInt(process.env.OTP_EXPIRY_MINUTES || '5');
const USERS = new Map();

// Send OTP Controller
export const sendOTP = (req, res) => {
  try {
    const { phone } = req.body;

    // Validate input
    if (!phone) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    // Generate OTP and calculate expiry time
    const otp = generateOTP();
    const expiresAt = Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000;

    // Save OTP temporarily in memory
    OTP_STORE.set(phone, { otp, expiresAt });

    console.log(`OTP for ${phone} is ${otp}`);

    // Return success
    res.json({ message: "OTP sent" });

  } catch (err) {
    // Catch any unexpected error
    console.error("Error in sendOTP:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Verify OTP Controller
export const verifyOTP = (req, res) => {
  try {
    const { phone, otp } = req.body;

    // Validate input
    if (!phone || !otp) {
      return res.status(400).json({ error: "Phone and OTP are required" });
    }

    // Check OTP record
    const record = OTP_STORE.get(phone);
    if (!record) {
      return res.status(400).json({ error: "OTP not found. Please request a new one." });
    }

    // Check if expired
    if (Date.now() > record.expiresAt) {
      OTP_STORE.delete(phone);
      return res.status(400).json({ error: "OTP expired" });
    }

    // Check OTP match
    if (record.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // OTP verified, delete from store
    OTP_STORE.delete(phone);

    // Simulate user creation if not exists
    if (!USERS.has(phone)) {
      USERS.set(phone, { phone, createdAt: new Date() });
    }

    const user = USERS.get(phone);

    // Generate JWT token
    const token = jwt.sign(
      { phone: user.phone },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });

  } catch (err) {
    // Catch any unexpected error
    console.error("Error in verifyOTP:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
