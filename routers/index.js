const express = require('express');
const UserController = require('../controllers/UserController');
const { isLoggedIn, isDoctor, isPatient } = require('../middlewares/auth');
const router = express.Router();

// define the home page route
router.get('/register', UserController.getRegister);
router.post('/register', UserController.postRegister);
router.get('/login', UserController.getLogin);
router.post('/login', UserController.postLogin);

// router.use(isLoggedIn);

router.get('/logout', UserController.getLogout);
router.get('/profile/:userId', UserController.getProfile);
router.get('/showMedicalRecords/:userId', UserController.getAllMR);
router.get('/addMedicalRecord/:userId', isPatient, UserController.getAddMR);
router.post('/addMedicalRecord/:userId', isPatient, UserController.postAddMR);

module.exports = router;
