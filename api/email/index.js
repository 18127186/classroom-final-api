const emailController = require('./emailController');
const express = require('express');
const router = express.Router();

router.post('/', emailController.sendEmail)

module.exports = router;