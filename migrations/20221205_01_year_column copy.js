const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    queryInterface.addConstraint("user_reading_lists", {
      fields: ["user_id", "blog_id"],
      type: "unique",
      name: "unique_user_reading_list",
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeConstraint(
      "user_reading_lists",
      "unique_user_reading_list"
    );
  },
};
