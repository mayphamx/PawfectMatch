const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class PlayDate extends Model {}

PlayDate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
      model: "user",
      key: "id",
      // unique: false,
      },
    },
    username: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "playdate",
  }
);

module.exports = PlayDate;
