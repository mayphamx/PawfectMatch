const router = require('express').Router();
const { PlayDate, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE new playdate
router.post('/', withAuth, async (req, res) => {
  try {
    const playdateData = await PlayDate.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json({playdateData, message:'Successfully created a new playdate!'});
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE playdate by ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    const playdateData = await PlayDate.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    res.status(200).json({ playdateData, message: 'Successfully updated playdate!' });
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
      res.status(404).json({message: 'No playdate found with this id!' });
      return;
    }

    res.status(200).json({playdateData, message:'Successfully deleted playdate!'});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;