const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_KEY || 'secret';

function generateToken(payload) {
  const token = jwt.sign(payload, SECRET, { expiresIn: '1d' });
  return token;
}

function validateToken(token) {
  // return jwt.verify(token, SECRET);
  let decoded;
  try {
    decoded = jwt.verify(token, SECRET);
  } catch (e) {
    return null;
  }
  return decoded;
}

module.exports = { generateToken, validateToken };
