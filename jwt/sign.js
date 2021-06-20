const jwt = require('jsonwebtoken');

const secret = 'secret';

const payload = {
  id: 1234
};

// ms
const token = jwt.sign(payload, secret, { expiresIn: 10 });

console.log(token);
