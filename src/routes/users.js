const express = require('express');
const { addUser } = require('../controllers/users');

const router = express.Router();

router.post('/', addUser);

module.exports = router;
