const User = require('../models/user');
const { generateToken } = require('../utils/jwt');

async function addUser(req, res) {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username }).exec();
  if (existingUser) {
    // {"error": "User already exist"}
    return res.status(409).json('User already exist');
    // status, sendStatus
    // status 只设置返回的status code, sendStatus 是设置并返回
    // send, json
  }

  const user = new User({ username, password });
  await user.hashPassword();
  await user.save();
  const token = generateToken({ id: user._id });
  return res.status(201).json({ token, username });
}

module.exports = { addUser };
