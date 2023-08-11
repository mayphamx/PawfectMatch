const router = require('express').Router();

// require CRUD routes per page
const petProfileRoutes = require('./petProfileRoutes');
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const commentRoutes = require('./meetupRoutes');

// login/logout page
router.use('/users', userRoutes);
// profile per pet
router.use('/petprofiles', petProfileRoutes);
// comments page
router.use('/comments', commentRoutes);
// meetup page
router.use('/meetups', meetupRoutes);

module.exports = router;