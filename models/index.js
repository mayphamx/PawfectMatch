const User = require("./User");
const Pet = require("./PetProfile");
const Meetup = require("./PlayDate");
const MeetupComment = require("./MeetupComment");
const MeetupRSVP = require("./MeetupRSVP");
const MeetupPet = require("./MeetupPet");

// User has Many Pets
User.hasMany(Pet, {
  foreignKey: "user_id",
});

// Pet belongs to one User
Pet.belongsTo(User, {
  foreignKey: "user_id",
});

// User can host many Meetups
User.hasMany(Meetup, {
  foreignKey: "host_id",
});

//Meetup is hosted by one user
Meetup.belongsTo(User, {
  foreignKey: "host_id",
});

// MeetupPet: One pet can attend many meetup events
Pet.belongsToMany(Meetup, {
  through: {
    model: MeetupPet,
    unique: false,
  },
  as: "meetup_pets",
});

// MeetupPet: Many pets can attend a single meetup event
Meetup.belongsToMany(Pet, {
  through: {
    model: MeetupPet,
    unique: false,
  },
  as: "meetup_pets",
});

// Meetup has many comments
Meetup.hasMany(MeetupComment, {
  foreignKey: "meetup_id",
});

// each meetup comment belongs to one Meetup event
MeetupComment.belongsTo(Meetup, {
  foreignKey: "meetup_id",
});

// One user can have multiple comments (in diferent events?)
User.hasMany(MeetupComment, {
  foreignKey: "user_id",
});

// MeetupComment belongs to one User
MeetupComment.belongsTo(User, {
  foreignKey: "user_id",
});

// Meetup event can list the many users who RSVPd
Meetup.hasMany(MeetupRSVP, {
  foreignKey: "meetup_id",
});

// MeetupRSVP belongs to one Meetup
MeetupRSVP.belongsTo(Meetup, {
  foreignKey: "meetup_id",
});

// User can have multiple RSVps to different meetup events
User.hasMany(MeetupRSVP, {
  foreignKey: "user_id",
});

// a single MeetupRSVP belongs to a single user
MeetupRSVP.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = {
  User,
  Pet,
  Meetup,
  MeetupComment,
  MeetupRSVP,
  MeetupPet,
};
