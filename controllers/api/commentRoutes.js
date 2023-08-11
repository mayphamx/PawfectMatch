const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// create comments if logged in
router.post('/', withAuth, async (req, res) => {
  try {
    console.log(req.body);
    const commentData = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;