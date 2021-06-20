const express = require('express');
const studentRoute = require('./students');
const courseRoute = require('./courses');
const userRoute = require('./users');
const authRoute = require('./auth');
const authGuard = require('../middleware/authGuard');

const router = express.Router();

router.use('/students', studentRoute);
router.use('/courses', courseRoute);
router.use('/users', userRoute);
router.use('/auth', authRoute);

module.exports = router;
