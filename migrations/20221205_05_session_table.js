const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("sessions", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
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
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("sessions");
  },
};
