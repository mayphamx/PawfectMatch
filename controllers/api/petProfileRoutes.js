const router = require('express').Router();
const { PetProfile, PlayDate } = require('../../models');

// show a single profile by profile ID
router.get('/:id', async (req, res) => {
  try {
    const profileData = await PetProfile.findByPk(req.params.id, {
      include: [{ model: PlayDate }]
    });
    res.status(200).json(profileData);
    if(!profileData) {
      res.status(404).json({ message: 'No profile found with this ID'});
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
  });

// // create new profile if logged in
// router.post('/', withAuth, async (req, res) => {
//   try {
//     const newPetProfile = await PetProfile.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     console.log('New profile created:', newPetProfile);

//     res.status(200).json(newPetProfile);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// // delete profile by profile ID if logged in
// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const profileData = await PetProfile.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!profileData) {
//       res.status(404).json({ message: 'No profile found with this id!' });
//       return;
//     }

//     res.status(200).json(profileData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// update profile by profile ID if logged in
router.put('/:id', withAuth, async (req, res) => {
  try {
    const profileData = await PetProfile.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    res.status(200).json(profileData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;