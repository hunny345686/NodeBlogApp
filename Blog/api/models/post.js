const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: "string",
      require: true,
      unique: true,
    },
    desc: {
      type: "string",
      require: true,
    },
    photo: {
      type: "string",
    },
    username: {
      type: "string",
      require: true,
    },
    categories: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
