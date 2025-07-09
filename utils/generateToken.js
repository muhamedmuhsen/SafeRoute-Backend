import jwt from "jsonwebtoken";

const generateToken = async(payload) => {
  return await jwt.sign(payload, process.env.JWT_SECRET, '1m');
};

export default generateToken;