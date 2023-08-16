const router = require('express').Router();
const {Comment} = require('../../models/');
const withAuth = require("../../utils/auth")

// CREATE comments if logged in
router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      ...req.body,
      user_id: req.session.user_id
    });
    console.log("TESTERSSSS"+ commentData);
    res.status(200).json({commentData, message:'Successfully added comment!'});
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;