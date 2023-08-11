const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class MeetupRsvp extends Model {}

MeetupRsvp.init(
  {},
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "MeetupRsvp",
  }
);

module.exports = MeetupRsvp;
