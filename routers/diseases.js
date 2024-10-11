const express = require('express');
const { isLoggedIn, isDoctor } = require('../middlewares/auth');
const DiseaseController = require('../controllers/DiseaseController');
const router = express.Router();

router.use([isLoggedIn, isDoctor]);

// main => /diseases
router.get('/', DiseaseController.getDiseases);
router.get('/add', DiseaseController.getAddDisease);
router.post('/add', DiseaseController.getPostDisease);
router.get('/delete/:diseaseId', DiseaseController.deleteDisease);

module.exports = router;
