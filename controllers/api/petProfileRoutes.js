const router = require('express').Router();
const { PetProfile} = require('../../models');
const withAuth = require("../../utils/auth")


// CREATE petprofile
  router.post('/', withAuth, async (req, res) => {
    try {
      const profileData = await PetProfile.create({
        ...req.body, 
        user_id: req.session.user_id
      });
      res.status(200).json({profileData, message: 'Successfully created petprofile!'});
    } catch (err) {
      res.status(400).json(err);
    }
  });

// // GET a profile by profile ID
// router.get('/:id', async (req, res) => {
//   try {
//     const profileData = await PetProfile.findByPk(req.params.id, {
//       include: [{ model: PlayDate }]
//     });
//     res.status(200).json(profileData);
//     if(!profileData) {
//       res.status(404).json({ message: 'No profile found with this ID'});
//       return;
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
//   });


module.exports = router;