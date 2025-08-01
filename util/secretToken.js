// utils/secretToken.js   {step-2}
//Creates a JWT token

require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 5 * 24 * 60 * 60, // 5 days
  });
};
