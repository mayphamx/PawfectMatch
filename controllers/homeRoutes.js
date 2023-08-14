const router = require('express').Router();
const { PetProfile, PlayDate, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET ALL playdates (JOIN with user data)
router.get('/', async (req, res) => {
  try {
    const playdateData = await PlayDate.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const playdates = playdateData.map((playdate) => playdate.get({ plain: true }));

    // Pass serialized data and session flag into handlebars template
    res.render('homepage', { 
      playdates, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a playdate by ID (JOIN with user and comment data)
router.get('/playdate/:id', async (req, res) => {
  try {
    const playdateData = await PlayDate.findByPk(req.params.id, {
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

    const playdate = playdateData.get({ plain: true });
    
    res.render('playdate', {
      ...playdate,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ?? WITH AUTH ??
// GET/EDIT a playdate by ID
router.get('/editplaydate/:id', async (req, res) => {
  try {
    const playdateData = await PlayDate.findByPk(req.params.id, {});

    const playdate = playdateData.get({ plain: true });

    res.render('editplaydate', {
      ...playdate,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ?? WITH AUTH ??
// GET a petprofile form
router.get('/petprofile/form', async (req, res) => {
  
  res.render('petprofileform', {
    logged_in: req.session.logged_in
  });
});

// ?? WITH AUTH ??
 // GET a petprofile by ID (JOIN with user data)
router.get('/petprofile/:id', async (req, res) => {
  try {
    const petprofileData = await PetProfile.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        }
      ],
    });

    const petprofile = petprofileData.get({ plain: true });

    res.render('petprofile', {
      ...petprofile,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET Dashboard Route (JOIN with playdate data; create form)
// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: PlayDate }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET login route
router.get('/login', (req, res) => {
  // if logged in, redirect the request to dashboard
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

// GET signup route
router.get('/signup', (req, res) => {
  // if logged in, redirect the request to dashboard
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

// ?? WITH AUTH, logged_in: req.session.logged_in ??
// ?? NEED post chat route in api routes folder ??
// GET chat route
router.get('/chat', (req, res) => {
  res.render('chat');
});

// ?? WITH AUTH, logged_in: req.session.logged_in ??
// ?? NEED post chat route in api routes folder ??
// GET chat route
router.get('/chat/:id', (req, res) => {
  res.render('chatroom');
});

module.exports = router;