const jwt = require('jsonwebtoken');

const secret = 'secret';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNCwiaWF0IjoxNjIzNDg5MTY5LCJleHAiOjE2MjM0ODkxNzl9.jFaK7UVH7SDvhBuMunxBxR5mZBHwqRXeh-txtq3-mns';

const valid = jwt.verify(token, secret);

console.log(valid);
