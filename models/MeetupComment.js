const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class MeetupComment extends Model {}

MeetupComment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    meetup_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Meetup",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "MeetupComment",
  }
);

module.exports = MeetupComment;
