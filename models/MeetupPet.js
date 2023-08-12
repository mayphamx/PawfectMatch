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
    modelName: "meetuppet",
  }
);

module.exports = MeetupPet;
