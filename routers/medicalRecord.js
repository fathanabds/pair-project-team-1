const express = require('express');
const { isLoggedIn, isDoctor, isPatient, isNotLoggedIn } = require('../middlewares/auth');
const UserController = require('../controllers/UserController');
const MRController = require('../controllers/MRController');
const router = express.Router();

router.use(isLoggedIn);

router.get('/patients/', isPatient, UserController.getPatientMR);
router.get('/doctors/', isDoctor, UserController.getDoctorMR);
router.get('/sendEmail/:recordId', isPatient, MRController.sendEmail);
router.get('/add/', isPatient, UserController.getAddMR);
router.post('/add/', isPatient, UserController.postAddMR);
router.get('/resolve/:recordId', isDoctor, MRController.getResolve);
router.post('/resolve/:recordId', isDoctor, MRController.postResolve);
router.get('/editSymptom/:recordId', isPatient, MRController.getEditSymptom);
router.post('/editSymptom/:recordId', isPatient, MRController.postEditSymptom);

module.exports = router;
