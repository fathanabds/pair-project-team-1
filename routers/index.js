const express = require('express');
const userRoutes = require('./user');
const diseasesRoutes = require('./diseases');
const MRRoutes = require('./medicalRecord');

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/user/login');
});
router.use('/user', userRoutes);
router.use('/diseases', diseasesRoutes);
router.use('/medicalRecord', MRRoutes);

module.exports = router;
