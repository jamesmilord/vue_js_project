const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");

//get posts
router.get("/", async (req, res) => {
  const posts = await loadCollection();
  res.send(await posts.find({}).toArray());
});

//add Post
router.post("/", async (req, res) => {
  const posts = await loadCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});

//delete post

router.delete("/:id", async (req, res) => {
  console.log(req.params.id);
  const posts = await loadCollection();
  await posts.deleteOne({
    _id: new mongodb.ObjectID(req.params.id)
  });
  res.status(200).send();
});

async function loadCollection() {
  const client = await mongodb.MongoClient.connect(
    //add url for mongodb here
    { useNewUrlParser: true }
  );
  return client.db("vue_node").collection("posts");
}

module.exports = router;
