const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PetProfile extends Model {}

PetProfile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    catdog: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activity_level: {
      type: DataTypes.STRING,
      allowNull: false,
      },
    },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'petprofile',
  }
);

module.exports = PetProfile;