const router = require("express").Router();

const { User, Blog, UserReadingList } = require("../models");

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

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const where = {};

  if (req.query.read) {
    where.read = req.query.read === "true";
  }

  const user = await User.findOne({
    where: {
      id,
    },
    include: [
      { model: Blog, as: "blogs" },
      {
        model: Blog,
        as: "readings",
        through: {
          attributes: ["id", "read"],
          as: "readinglists",
          where,
        },
      },
    ],
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.put("/:username", async (req, res) => {
  const { username } = req.params;
  const user = await User.update(req.body, {
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
