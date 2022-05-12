const router = require("express").Router();

const { Blog } = require("../models");
const User = require("../models/user");
const ReadingList = require("../models/reading_list");
const { sequelize } = require("../util/db");

router.post("/", async (request, response) => {
  const { userId, blogId } = request.body;

  const readingList = await ReadingList.create({
    userId,
    blogId,
  });

  response.json(readingList);
});

module.exports = router;
