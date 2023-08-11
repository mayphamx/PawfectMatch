const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class MeetupPet extends Model {}

MeetupPet.init({
  
});

module.exports = MeetupPet;
