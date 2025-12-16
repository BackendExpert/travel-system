const express = require('express');
const AuthController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/create-auth', AuthController.createAuth)

module.exports = router;