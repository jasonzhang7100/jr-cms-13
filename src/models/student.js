const { Schema, model } = require('mongoose');
const Joi = require('joi');

// joi, express-validator
// validator.js

const schema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (email) => {
        // const validation = Joi.string().email().validate(email);
        // const { error } = validation;
        // if (error) {
        //   // return false 代表验证失败
        //   return false;
        // } else {
        //   return true;
        // }
        // 如果error有值，则校验失败
        return !Joi.string().email().validate(email).error;
      },
      msg: 'Invalid email format'
    }
  },
  courses: [{ type: String, ref: 'Course' }]
});

module.exports = model('Student', schema);
