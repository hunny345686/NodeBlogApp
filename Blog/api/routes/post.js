const router = require("express").Router();
const User = require("../models/user");
const Post = require("../models/post");

// Create New Post
router.post("/createPost", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update
router.patch("/updatePost/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatePost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatePost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(404).json("You Can Update Only Your Post..");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Post
router.delete("/deletePost/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post Has Been Deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(404).json("You Can Delete Only Your Post..");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get User

router.get("/singlePost/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All Posts
router.get("/allPost", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
      catName;
    } else if (catName) {
      posts = await Post.find({ categories: { $in: [catname] } });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
