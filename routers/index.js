const express = require('express');
const UserController = require('../controllers/UserController');
const { isLoggedIn, isDoctor, isPatient } = require('../middlewares/auth');
const DiseaseController = require('../controllers/DiseaseController');
const MRController = require('../controllers/MRController');
const router = express.Router();

// define the home page route
router.get('/user/register', UserController.getRegister);
router.post('/user/register', UserController.postRegister);
router.get('/user/login', UserController.getLogin);
router.post('/user/login', UserController.postLogin);

// router.use(isLoggedIn);

router.get('/user/logout', UserController.getLogout);
router.get('/diseases', DiseaseController.getDiseases);
router.get('/diseases/delete/:diseaseId', DiseaseController.getDiseases);
router.get('/user/profile/:userId', UserController.getProfile);
router.get('/medicalRecord/patients/:userId', UserController.getPatientMR);
router.get('/medicalRecord/doctors/:userId', UserController.getDoctorMR);
router.get('/medicalRecord/add/:userId', UserController.getAddMR);
router.post('/medicalRecord/add/:userId', UserController.postAddMR);
router.get('/medicalRecord/resolve/:recordId', MRController.getResolve);
router.post('/medicalRecord/resolve/:recordId', MRController.postResolve);
router.get('/medicalRecord/editSymptom/:recordId', MRController.getEditSymptom);
router.post('/medicalRecord/editSymptom/:recordId', MRController.postEditSymptom);

module.exports = router;
