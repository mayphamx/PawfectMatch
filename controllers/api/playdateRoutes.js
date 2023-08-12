const router = require('express').Router();
const { PlayDate, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', async (req, res) => {
try {
  const playdateData = await PlayDate.findByPk(req.params.id, {
    include: [{ model: Comment }]
  });
  res.status(200).json(playdateData);
  if(!playdateData) {
    res.status(404).json({ message: 'No playdate found with this ID'});
    return;
  }
} catch (err) {
  res.status(500).json(err);
}
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newPlayDate = await PlayDate.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    console.log('New playdate created:', newPlayDate);

    res.status(200).json(newPlayDate);
  } catch (err) {
    res.status(400).json(err);
  }
});

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

    res.status(200).json(playdateData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const playdateData = await PlayDate.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    res.status(200).json(playdateData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;