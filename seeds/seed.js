const sequelize = require("../config/connection");
const { User, PetProfile, Meetup, MeetupComment } = require("../models");
const userData = require("./userData.json");
const petProfileData = require("./petProfileData.json");
const meetupData = require("./meetupData.json");
const CommentData = require("./meetupData.json");


const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    await PetProfile.bulkCreate(petProfileData);

    await Meetup.bulkCreate(meetupData);
    await MeetupComment.bulkCreate(CommentData);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
