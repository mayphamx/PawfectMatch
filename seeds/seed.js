const sequelize = require("../config/connection");
const { User, Pet, PlayDate, Comment, MeetupPet } = require("../models");
const userData = require("./userData.json");
const petData = require("./petData.json");
const playdateData = require("./playdateData.json");
const CommentData = require("./CommentData.json");
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

    console.log("Seeding Pet data...");
    await Pet.bulkCreate(petData);
    console.log("Pet data seeded successfully.");

    console.log("Seeding Meetup data...");
    await PlayDate.bulkCreate(playdateData);
    console.log("Meetup data seeded successfully.");

    console.log("Seeding Comment data...");
    await Comment.bulkCreate(CommentData);
    console.log("Comment data seeded successfully.");

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
