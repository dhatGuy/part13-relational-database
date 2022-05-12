const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./reading_list");

User.hasMany(Blog, {
  foreignKey: "authorId",
  as: "blogs",
});
Blog.belongsTo(User, {
  foreignKey: "authorId",
  as: "author",
});

Blog.belongsToMany(User, { through: ReadingList, as: "readingList" });
User.belongsToMany(Blog, { through: ReadingList, as: "readingList" });

module.exports = {
  Blog,
  User,
  ReadingList,
};
