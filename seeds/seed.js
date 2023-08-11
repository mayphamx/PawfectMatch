const sequelize = require('../config/connection');
const PetProfile= require('../models/PetProfile');
const User= require('../models/User');

const petData = require('./petProfileData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const petProfile = await PetProfile.bulkCreate(userData, {
    returning: true,
  });

  const userProfiles = await User.bulkCreate(userData,{
    returning: true,
  })

  process.exit(0);
};

seedDatabase();