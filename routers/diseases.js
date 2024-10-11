const express = require('express');
const { isLoggedIn, isDoctor } = require('../middlewares/auth');
const DiseaseController = require('../controllers/DiseaseController');
const router = express.Router();

router.use(isLoggedIn);

// main => /diseases
router.get('/', isDoctor, DiseaseController.getDiseases);
router.get('/add', isDoctor, DiseaseController.getAddDisease);
router.post('/add', isDoctor, DiseaseController.getPostDisease);
router.get('/delete/:diseaseId', isDoctor, DiseaseController.deleteDisease);

module.exports = router;
