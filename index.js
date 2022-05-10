require("dotenv").config();
const { Sequelize, Model } = require("sequelize");
const express = require("express");
const app = express();

app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    likes: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "blogs",
    underscored: true,
    timestamps: false,
  }
);

Blog.sync();

app
  .route("/api/blogs")
  .get(async (req, res) => {
    try {
      const blogs = await Blog.findAll();
      res.json(blogs);
    } catch (error) {
      return res.status(400).json({ error });
    }
  })
  .post(async (req, res) => {
    try {
      const blog = await Blog.create(req.body);
      res.json(blog);
    } catch (error) {
      return res.status(400).json({ error });
    }
  });

app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
