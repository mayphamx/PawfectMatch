const router = require('express').Router();
const { PlayDate, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

// ! GET,POST,PUT, & DELETE PLAYDATE ROUTES !

// // GET playdate by ID
// router.get('/:id', async (req, res) => {
// try {
//   const playdateData = await PlayDate.findByPk(req.params.id, {
//     include: [{ model: Comment }]
//   });
//   res.status(200).json(playdateData);
//   if(!playdateData) {
//     res.status(404).json({ message: 'No playdate found with this ID'});
//     return;
//   }
// } catch (err) {
//   res.status(500).json(err);
// }
// });

// CREATE new playdate
router.post('/', withAuth, async (req, res) => {
  try {
    const newPlayDate = await PlayDate.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    console.log('New playdate created:', newPlayDate);

    res.status(200).json({newPlayDate, message:'Successfully created a new playdate!'});
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE playdate by ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    // const affectedRowCount = await PlayDate.update(req.body, {
    //   where: {
    //     id: req.params.id,
    //     user_id: req.session.user_id,
    //   },
    // });

    // if (affectedRowCount[0] === 0) {
    //   return res.status(404).json({ message: 'Playdate not found!' });
    // }

    const updatedPlaydate = await PlayDate.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    res.status(200).json({ updatedPlaydate, message: 'Successfully updated playdate' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE playdate by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const playdateData = await PlayDate.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!playdateData) {
      res.status(404).json({ message: 'No playdate found with this id!' });
      return;
    }

    res.status(200).json({message:'Successfully deleted playdate!'});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;