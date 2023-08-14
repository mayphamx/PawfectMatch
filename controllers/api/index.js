const router = require('express').Router();

// require CRUD routes per page
const petProfileRoutes = require('./petProfileRoutes');
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const playdateRoutes = require('./playdateRoutes');

// login/logout page
router.use('/users', userRoutes);
// profile per pet
router.use('/petprofiles', petProfileRoutes);
// comments page
router.use('/comments', commentRoutes);
// playdate page
router.use('/playdate', playdateRoutes);

module.exports = router;