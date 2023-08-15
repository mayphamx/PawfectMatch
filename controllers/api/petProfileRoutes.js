const router = require('express').Router();
const { PetProfile} = require('../../models');
const withAuth = require("../../utils/auth");

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

// CREATE petprofile
  router.post('/form', withAuth, upload.single('photo'), async (req, res) => {
    console.log("Session User Id",req.session.user_id);
    try {
      console.log(req.body);
      const profileData = await PetProfile.create({
        ...req.body, 
        // ...req.photo,
        user_id: req.session.user_id
      });
      res.status(200).json({profileData, message: 'Successfully created petprofile!'});
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;