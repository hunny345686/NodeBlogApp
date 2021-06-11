const router = require("express").Router();
const Category = require("../models/category");

// Create New Category
router.post("/createCate", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const saveCat = await newCat.save();
    res.status(200).json(saveCat);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Get All Category

router.get("/allCate", async (req, res) => {
  try {
    const newCat = await Category.find();
    res.status(200).json(newCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

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
