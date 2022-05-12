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

Blog.belongsToMany(User, { through: UserReadingList, as: "readingList" });
User.belongsToMany(Blog, { through: UserReadingList, as: "readingList" });

module.exports = {
  Blog,
  User,
  UserReadingList,
};
