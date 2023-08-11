const router = require('express').Router();
const petProfileRoutes = require('./petProfileRoutes');
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
router.use('/petprofiles', petProfileRoutes);

module.exports = router;