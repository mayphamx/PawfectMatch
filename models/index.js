const User = require("./User");
const PetProfile = require("./PetProfile");
const PlayDate = require("./PlayDate");
const Comment = require("./Comment");

// ?? User has one pet profile
// User has Many PetProfiles
// User.hasMany(PetProfile, {
//   foreignKey: "user_id",
// });

// PetProfile belongs to one User
PetProfile.belongsTo(User, {
  foreignKey: "user_id",
});

// User can host many Playdates
User.hasMany(PlayDate, {
  foreignKey: "user_id",
  onDelete:'CASCADE'
});

//Playdate is usered by one user
PlayDate.belongsTo(User, {
  foreignKey: "user_id",
});

// Playdate has many comments
PlayDate.hasMany(Comment, {
  foreignKey: "playdate_id",
});

// each playdate comment belongs to one playdate event
Comment.belongsTo(PlayDate, {
  foreignKey: "playdate_id",
});

// One user can have multiple comments
User.hasMany(Comment, {
  foreignKey: "user_id",
});

// playdate Comment belongs to one User
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = {
  User,
  PetProfile,
  PlayDate,
  Comment
};
