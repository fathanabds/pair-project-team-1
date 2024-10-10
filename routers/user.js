const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/auth');
const UserController = require('../controllers/UserController');
const router = express.Router();

router.get('/register', isNotLoggedIn, UserController.getRegister);
router.post('/register', isNotLoggedIn, UserController.postRegister);
router.get('/login', isNotLoggedIn, UserController.getLogin);
router.post('/login', isNotLoggedIn, UserController.postLogin);

router.use(isLoggedIn);

router.get('/logout', UserController.getLogout);
router.get('/profile/', UserController.getProfile);

module.exports = router;
