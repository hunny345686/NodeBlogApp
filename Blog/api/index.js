const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/post");
const cateRoute = require("./routes/category");
const multer = require("multer");
const path = require("path");

// Add to use json Data And ENV Config file in root folder
dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

// connect to DB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Store Images on MOngo db

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name);
  },
});

var upload = multer({ storage: storage });

app.post("/uploadFile", upload.single("file"), function (req, res) {
  res.status(200).json("file has been uploaded...");
});

// const storege = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

// const upload = multer({ storege: storege });

// app.post("/uploadFile", upload.single("file"), (req, res) => {
//   console.log(req.body);
//   res.status(200).json("file has been uploaded...");
// });

// routes middelware
// "/api/auth" you may or may not to write this
app.use(authRoute);
app.use(userRoute);
app.use(postRoute);
app.use(cateRoute);

// listen to server
app.listen("5000", () => {
  console.log("runing on 5000");
});
