const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.json());

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/catalogue-app",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true // enlever ligne warning deprecated etc
  }
);

const Department = mongoose.model("Department", {
  title: String
});

module.exports = Department;
