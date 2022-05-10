const router = require("express").Router();

const { Blog } = require("../models");

router.use(async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
});

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post("/", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const blog = req.blog;
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", async (req, res) => {
  const blog = req.blog;
  if (blog) {
    await blog.destroy();
  }
  res.status(204).end();
});

router.put("/:id", async (req, res) => {
  const blog = req.blog;
  if (blog) {
    blog.important = req.body.important;
    await blog.save();
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
