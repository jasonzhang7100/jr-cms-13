const jwt = require('jsonwebtoken');

function generateToken(payload) {
  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1d' });
  return token;
}

function validateToken(token) {
  // return jwt.verify(token, process.env.JWT_KEY);
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_KEY);
  } catch (e) {
    return null;
  }
  return decoded;
}

module.exports = { generateToken, validateToken };
