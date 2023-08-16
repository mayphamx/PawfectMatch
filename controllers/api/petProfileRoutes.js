const router = require('express').Router();
const { PetProfile} = require('../../models');
const withAuth = require("../../utils/auth");

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
// CREATE petprofile
  router.post('/form', withAuth, upload.single('photo'), async (req, res) => {
    console.log("Session User Id",req.session.user_id);
    const petInfo = req.body;
    console.log("TEST" + JSON.stringify(petInfo));

    try {
      const vaccinated = petInfo.vaccinated === 'yes'? true: false;
      const profileData = await PetProfile.create({
        ...req.body, 
        vaccinated: vaccinated,
        user_id: req.session.user_id
      });

      const petprofile = profileData.get({ plain: true });
      console.log(profileData);
      
      res.render('petprofile', {
        ...petprofile,
        logged_in: req.session.logged_in
      });

      res.status(200).json({profileData, message: 'Successfully created petprofile!'});
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;