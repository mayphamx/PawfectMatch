const User = require("./User");
const Pet = require("./Pet");
const PlayDate = require("./PlayDate");
const Comment = require("./Comment");
// const MeetupRSVP = require("./MeetupRSVP");
// const MeetupPet = require("./MeetupPet");

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

/*
// One pet can attend many playdate events
Pet.belongsToMany(PlayDate, {
  through: {
    model: MeetupPet,
    unique: false,
  },
  as: "meetup_pets",
});

// MeetupPet: Many pets can attend a single meetup event
PlayDate.belongsToMany(Pet, {
  through: {
    model: MeetupPet,
    unique: false,
  },
  as: "meetup_pets",
});

// Meetup event can list the many users who RSVPd
PlayDate.hasMany(MeetupRSVP, {
  foreignKey: "meetup_id",
});

// MeetupRSVP belongs to one Meetup
MeetupRSVP.belongsTo(PlayDate, {
  foreignKey: "meetup_id",
});

// User can have multiple RSVps to different meetup events
User.hasMany(MeetupRSVP, {
  foreignKey: "user_id",
});

// a single MeetupRSVP belongs to a single user
MeetupRSVP.belongsTo(User, {
  foreignKey: "user_id",
});*/

module.exports = {
  User,
  Pet,
  PlayDate,
  Comment,
  // MeetupRSVP,
  // MeetupPet,
};
