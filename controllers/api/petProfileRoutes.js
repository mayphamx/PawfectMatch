const router = require('express').Router();
const { PetProfile} = require('../../models');
const withAuth = require("../../utils/auth");

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

// // CREATE petprofile
//   router.post('/form', withAuth, async (req, res) => {
//     try {
//       const profileData = await PetProfile.create({
//         ...req.body, 
//         user_id: req.session.user_id
//       });
//       res.status(200).json({profileData, message: 'Successfully created petprofile!'});
//     } catch (err) {
//       res.status(400).json(err);
//     }
//   });

// CREATE petprofile
  router.post('/form', withAuth, upload.single('photo'), async (req, res) => {
    try {
      const profileData = await PetProfile.create({
        ...req.body, 
        ...req.photo,
        user_id: req.session.user_id
      });
      res.status(200).json({profileData, message: 'Successfully created petprofile!'});
    } catch (err) {
      res.status(400).json(err);
    }
  });

// // MULTER UPLOAD PHOTO
// const express = require('express')
// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

// const app = express()

// app.post('/uploadphotoform', upload.single('avatar'), function (req, res, next) {
//   req.file is the `avatar` file
//   req.body will hold the text fields, if there were any
// })

// app.post('/uploadphotoform', upload.single('avatar'), withAuth, async (req, res) => {
//   try {
//     const profileData = await PetProfile.create({
//       ...req.photo, 
//       user_id: req.session.user_id
//     });
//     res.status(200).json({profileData, message: 'Successfully uploaded photo!'});
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

module.exports = router;