const User = require('../models/user');
const { generateToken } = require('../utils/jwt');

async function login(req, res) {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).exec();
  if (!user) {
    return res.status(404).json('username not found');
  }
  const validPassword = await user.validatePassword(password);
  // fail fast
  if (!validPassword) {
    return res.status(401).json('Invalid username or password');
  }

  const token = generateToken({ id: user._id });
  return res.json({ token, username });
}

module.exports = { login };
