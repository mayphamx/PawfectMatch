const sequelize = require("../config/connection");
const { User, PetProfile, PlayDate, Comment } = require("../models");
const userData = require("./userData.json");
const petprofileData = require("./petprofileData.json");
const playdateData = require("./playdateData.json");
const commentData = require("./commentsData.json");


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
    await PetProfile.bulkCreate(petprofileData);
    console.log("Pet data seeded successfully.");

    console.log("Seeding PlayDate data...");
    await PlayDate.bulkCreate(playdateData, {
      individualHooks: true,
      returning: true,
    });
    console.log("Playdate data seeded successfully.");

    console.log("Seeding Comment data...");
    await Comment.bulkCreate(commentData);
    console.log("Comment data seeded successfully.");

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
