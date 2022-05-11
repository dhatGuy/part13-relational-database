const router = require("express").Router();

const { User, Blog } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: [{ model: Blog, as: "blogs" }],
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.get("/:username", async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({
    where: {
      username,
    },
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
