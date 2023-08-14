const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class PetProfile extends Model {}

PetProfile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    pet_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    animal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    personality: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vaccinated: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    photo: {
      type: DataTypes.STRING, // ! check MULTER docs
      allowNull: true,
    },    
    location: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
        unique: false,
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "petprofile",
  }
);

module.exports = PetProfile;