const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all petprofiles and JOIN with user data
    const petProfileData = await PetProfile.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const petprofiles = petProfileData.map((petprofile) => petprofile.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      petprofiles, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/petprofile/:id', async (req, res) => {
  try {
    const petProfileData = await PetProfile.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [User],
        }
      ],
    });

    const petprofile = petProfileData.get({ plain: true });

    res.render('petprofile', {
      ...petprofile,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const petProfileData = await PetProfile.findByPk(req.params.id, {});

    const petprofile = petProfileData.get({ plain: true });

    res.render('editpetprofile', {
      ...petprofile,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/meetup', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('meetup', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // if logged in, redirect to another route
  if (req.session.logged_in) {
    res.redirect('/meetup');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // if logged in, redirect to another route
  if (req.session.logged_in) {
    res.redirect('/meetup');
    return;
  }

  res.render('signup');
});

module.exports = router;