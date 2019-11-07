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

// use heroku var env file for perso heroku PORT
// se comporte comme un if var env PORT exists: (process.env.PORT) ? process.env.PORT : 3000
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
