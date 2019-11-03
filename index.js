const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const crudDepartment = require("./routes/crudDepartment");
const crudCategory = require("./routes/crudCategory");
const crudProduct = require("./routes/crudProduct");

app.use(crudDepartment);
app.use(crudCategory);
app.use(crudProduct);

app.listen(3000, () => {
  console.log("Server started");
});
