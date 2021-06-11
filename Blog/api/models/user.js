const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: "string",
      require: true,
      unique: true,
    },
    email: {
      type: "string",
      require: true,
      unique: true,
    },
    password: {
      type: "string",
      require: true,
    },
    profilePic: {
      type: "string",
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
