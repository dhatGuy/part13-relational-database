const router = require("express").Router();

const { Blog } = require("../models");
const User = require("../models/user");
const { sequelize } = require("../util/db");

router.get("/", async (request, response) => {
  const users = await Blog.findAll({
    attributes: [
      [sequelize.fn("count", sequelize.col("blogs.id")), "articles"],
      [sequelize.fn("sum", sequelize.col("likes")), "likes"],
    ],
    group: ["author.id"],
    order: [[sequelize.fn("sum", sequelize.col("likes")), "DESC"]],
    include: [
      {
        model: User,
        as: "author",
        attributes: ["name"],
      },
    ],
  });

  response.json(users);
});

module.exports = router;
