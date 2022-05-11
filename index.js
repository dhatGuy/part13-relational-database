const express = require("express");
const app = express();
require("express-async-errors");

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

const errorHandler = (error, request, response, next) => {
  console.error(error);

  if (error.name === "SequelizeValidationError") {
    return response
      .status(400)
      .json({ error: error.errors.map((e) => e.message) });
  }
  response.status(400).send({ error });
};

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
