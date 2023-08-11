const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class MeetupPet extends Model {}

MeetupPet.init(
  {},
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "MeetupPet",
  }
);

module.exports = MeetupPet;
