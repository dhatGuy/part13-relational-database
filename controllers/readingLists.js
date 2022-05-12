const router = require("express").Router();

const ReadingList = require("../models/reading_list");
const tokenExtractor = require("../middlewares/tokenExtractor");
const checkSession = require("../middlewares/checkSession");

router.post("/", async (request, response) => {
  const { userId, blogId } = request.body;

  const readingList = await ReadingList.create({
    userId,
    blogId,
  });

  response.json(readingList);
});

router.put("/:id", tokenExtractor, checkSession, async (request, response) => {
  const { id } = request.params;
  const { read } = request.body;

  const readingList = await ReadingList.findOne({
    where: {
      id,
    },
  });

  if (request.decodedToken.id == readingList.toJSON().userId) {
    const update = await ReadingList.update(
      { read },
      {
        where: {
          id,
        },
      }
    );

    return response.json(update);
  }

  response.status(401).send("Unauthorized");
});

module.exports = router;
