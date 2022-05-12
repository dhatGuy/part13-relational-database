const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Session extends Model {}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    expires: {
      type: DataTypes.DATE,
      // expires after 1 hour
      defaultValue: sequelize.literal("NOW() + INTERVAL '1 hour'"),
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Sessions",
    underscored: true,
    timestamps: false,
  }
);

module.exports = Session;
