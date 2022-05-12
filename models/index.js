const Blog = require("./blog");
const User = require("./user");
const UserReadingList = require("./reading_list");

User.hasMany(Blog, {
  foreignKey: "authorId",
  as: "blogs",
});
Blog.belongsTo(User, {
  foreignKey: "authorId",
  as: "author",
});

Blog.belongsToMany(User, { through: UserReadingList, as: "readings" });
User.belongsToMany(Blog, { through: UserReadingList, as: "readings" });

module.exports = {
  Blog,
  User,
  UserReadingList,
};
