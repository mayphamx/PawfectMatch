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
const meetupPet = require("./meetupPetData.json");

const seedDatabase = async () => {
  try {
    console.log("Starting database seeding...");
    await sequelize.sync({ force: true });
    console.log("Database synchronization completed.");

    console.log("Seeding User data...");
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    console.log("User data seeded successfully.");

    console.log("Seeding PetProfile data...");
    await PetProfile.bulkCreate(petProfileData);
    console.log("PetProfile data seeded successfully.");

    console.log("Seeding Meetup data...");
    await Meetup.bulkCreate(meetupData);
    console.log("Meetup data seeded successfully.");
    
    console.log("Seeding MeetupComment data...");
    await MeetupComment.bulkCreate(meetupCommentData);
    console.log("MeetupComment data seeded successfully.");

    console.log("Seeding MeetupPet data...");
    await MeetupPet.bulkCreate(meetupPet);
    console.log("MeetupPet data seeded successfully.");

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
