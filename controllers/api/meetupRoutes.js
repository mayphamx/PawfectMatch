const router = require('express').Router();
const { Meetup, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', async (req, res) => {
try {
  const meetupData = await Meetup.findByPk(req.params.id, {
    include: [{ model: Comment }]
  });
  res.status(200).json(meetupData);
  if(!meetupData) {
    res.status(404).json({ message: 'No meetup found with this ID'});
    return;
  }
} catch (err) {
  res.status(500).json(err);
}
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newMeetup = await Meetup.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    console.log('New meetup created:', newMeetup);

    res.status(200).json(newMeetup);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const meetupData = await Meetup.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!meetupData) {
      res.status(404).json({ message: 'No meetup found with this id!' });
      return;
    }

    res.status(200).json(meetupData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const meetupData = await Meetup.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    res.status(200).json(meetupData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;