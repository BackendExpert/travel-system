const express = require('express');
const AuthController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/create-auth', AuthController.createAuth)

router.post('/verify-password', AuthController.verifypassword)

module.exports = router;