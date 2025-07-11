import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

/**
 * Generates a JWT token for the given payload
 * @param {Object} payload - The payload to encode in the token
 * @returns {string} JWT token
 */
const generateToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1m" // Token expires in 1 minute (adjust as needed)
    });
  } catch (error) {
    throw new Error("Failed to generate token");
  }
};

export default generateToken;
