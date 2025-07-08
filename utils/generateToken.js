const jwt = require("jsonwebtoken");

const generateToken = async(payload) => {
  return await jwt.sign(payload, process.env.JWT_SECRET, '1m');
};

module.exports = generateToken