const sequelize = require("../config/connection");
const {
  User,
  PetProfile,
  Meetup,
  MeetupComment,
  MeetupPet,
} = require("../models");
const userData = require("./userData.json");
const petProfileData = require("./petProfileData.json");
const meetupData = require("./meetupData.json");
const meetupCommentData = require("./meetupCommentData.json");
const meetupPet = require("meetupPetData./.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    await PetProfile.bulkCreate(petProfileData);

    await Meetup.bulkCreate(meetupData);
    await MeetupComment.bulkCreate(meetupCommentData);
    await MeetupPet.bulkCreate(meetupPet);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
