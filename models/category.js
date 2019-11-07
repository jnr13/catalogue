const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.json());

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/catalogue-app",
  {
    useNewUrlParser: true
  }
);

const Category = mongoose.model("Category", {
  title: {
    type: String
  },
  description: {
    type: String
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department"
  }
});

module.exports = Category;
