const Blog = require("./blog");
const User = require("./user");

User.hasMany(Blog, {
  foreignKey: "authorId",
  as: "blogs",
});
Blog.belongsTo(User, {
  foreignKey: "authorId",
  as: "author",
});

module.exports = {
  Blog,
  User,
};
