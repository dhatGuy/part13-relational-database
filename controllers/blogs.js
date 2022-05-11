const router = require("express").Router();

const tokenExtractor = require("../middlewares/tokenExtractor");
const { Blog, User } = require("../models");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id, {
    include: [{ model: User, as: "author" }],
    attributes: {
      exclude: ["authorId"],
    },
  });
  next();
};

router
  .route("/")
  .get(async (req, res) => {
    const blogs = await Blog.findAll({
      include: [{ model: User, as: "author", attributes: ["name"] }],
      attributes: {
        exclude: ["authorId"],
      },
    });
    res.json(blogs);
  })
  .post(tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({ ...req.body, authorId: user.id });
    res.json(blog);
  });

router
  .use("/:id", blogFinder)
  .route("/:id")
  .get(async (req, res) => {
    const blog = req.blog;
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).end();
    }
  })
  .delete(async (req, res) => {
    const blog = req.blog;
    if (blog && blog.author.id === req.decodedToken.id) {
      await blog.destroy();
    }
    res.status(204).end();
  })
  .put(async (req, res) => {
    const blog = req.blog;
    try {
      if (blog) {
        blog.likes = req.body.likes;
        await blog.save();
        res.json({ likes: blog.likes });
      } else {
        res.status(404).end();
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  });

module.exports = router;
