// DEPARTMENT CRUD

const express = require("express");
const router = express.Router();
const Department = require("./../models/department");
const Category = require("./../models/category");
const Product = require("./../models/product");

router.post("/department/create", async (req, res) => {
  try {
    if (req.body.title) {
      const newDepartment = new Department({
        title: req.body.title
      });
      await newDepartment.save();
      res.json({ message: "New department created" });
    } else {
      res.send(400).send({ error: error.message });
    }
  } catch (error) {
    res.status(400).json({
      error: {
        message: error.message
      }
    });
  }
});

router.get("/department", async (req, res) => {
  try {
    const departments = await Department.find();
    res.send(departments);
    res.json({ message: "Department read Ok" });
  } catch (error) {
    res.status(400).json({
      error: {
        message: "Department read : Bad request"
      }
    });
  }
});

// POSTMAN POST: http://localhost:3000/department/update?id=5dbda719b7ac6006c9a2acbe
router.put("/department/update", async (req, res) => {
  try {
    const id = req.query.id;
    const title = req.body.title;
    const department = await Department.findOne({ _id: id });

    if (department && title) {
      department.title = title;
      await department.save();
      res.json({ message: "Updated" });
    } else {
      return res.status(400).send({
        error: {
          message: "Department not found"
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

// POSTMAN DELETE: http://localhost:3000/category/delete?id=5dbecb365879af049faec8a4
router.delete("/department/delete", async (req, res) => {
  try {
    const id = req.query.id;
    const department = await Department.findById(id);

    if (department) {
      // Delete Categories
      const categoryList = await Category.find();
      for (let i = 0; i < categoryList.length; i++) {
        if (categoryList[i].department == id) {
          // Remove products
          const productList = await Product.find();

          for (let j = 0; j < productList.length; j++) {
            if (productList[j].category.equals(categoryList[i]._id)) {
              // console.log(productList[i]._id);
              // console.log(productList[j].title);
              await productList[j].remove();
              console.log("Product removed" + j);
            }
          }

          // Remove category
          await categoryList[i].remove();
          console.log(categoryList[i].title);
          console.log("Category removed " + i);
        }
      }

      // Remove department
      await department.remove();
      console.log(department.title);
      console.log("Department removed");
      res.json({ message: "Department removed" });
    } else {
      return res.status(400).send({
        error: {
          message: "Department id not found"
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

module.exports = router;
