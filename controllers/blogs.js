const router = require("express").Router();

const { Blog } = require("../models");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router
  .route("/")
  .get(async (req, res) => {
    const blogs = await Blog.findAll();
    res.json(blogs);
  })
  .post(async (req, res) => {
    try {
      const blog = await Blog.create(req.body);
      res.json(blog);
    } catch (error) {
      return res.status(400).json({ error });
    }
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
    if (blog) {
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
