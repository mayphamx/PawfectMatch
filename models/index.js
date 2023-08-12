const User = require("./User");
const Pet = require("./Pet");
const PlayDate = require("./PlayDate");
const Comment = require("./Comment");


// User has Many Pets
User.hasMany(Pet, {
  foreignKey: "user_id",
});

// Pet belongs to one User
Pet.belongsTo(User, {
  foreignKey: "user_id",
});

// User can host many Playdates
User.hasMany(PlayDate, {
  foreignKey: "host_id",
});

//Playdate is hosted by one user
PlayDate.belongsTo(User, {
  foreignKey: "host_id",
});

// Playdate has many comments
PlayDate.hasMany(Comment, {
  foreignKey: "meetup_id",
});

// each playdate comment belongs to one Meetup event
Comment.belongsTo(PlayDate, {
  foreignKey: "meetup_id",
});

// One user can have multiple comments (in diferent events?)
User.hasMany(Comment, {
  foreignKey: "user_id",
});

// MeetupComment belongs to one User
Comment.belongsTo(User, {
  foreignKey: "user_id",
});



module.exports = {
  User,
  Pet,
  PlayDate,
  Comment
};
