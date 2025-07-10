import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, { 
      expiresIn: "1m" // 7 days - adjust as needed
    });
  } catch (error) {
    throw new Error("Failed to generate token");
  }
};

export default generateToken;
