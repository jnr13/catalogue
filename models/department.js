const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/catalogue-app", {
  useNewUrlParser: true
});

const Department = mongoose.model("Department", {
  title: String
});

module.exports = Department;
