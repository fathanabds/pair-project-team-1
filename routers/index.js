const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

// define the home page route
router.get('/register', UserController.getRegister);
router.post('/register', UserController.postRegister);
router.get('/login', UserController.getLogin);
router.post('/login', UserController.postLogin);

module.exports = router;
