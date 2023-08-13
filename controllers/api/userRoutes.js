const router = require('express').Router();
const { User } = require('../../models');

// sign up route default
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json({ userData, message: 'You are now signed up!'});
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// log in route 
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
      // res.redirect('/');
    });

  } catch (err) {
    res.status(400).json(err);
  }
});


// log out route 
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
    res.status(200).json({message: 'You are now logged out!'});
  } else {
    res.status(404).end();
  }
});

module.exports = router;