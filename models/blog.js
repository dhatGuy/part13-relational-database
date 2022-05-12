const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      default: false,
      validate: {
        min: {
          args: 1991,
          msg: "Year must be greater than or equal to 1991",
        },
        max: {
          args: new Date().getFullYear(),
          msg: "Year must be less than or equal to current year",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "blogs",
    underscored: true,
    timestamps: true,
  }
);

module.exports = Blog;
