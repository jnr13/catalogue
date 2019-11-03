// DEPARTMENT CRUD

const express = require("express");
const router = express.Router();
const Department = require("./../models/department");
const Category = require("./../models/category");
const Product = require("./../models/product");

router.post("/department/create", async (req, res) => {
  try {
    if (req.body.title) {
      const newDepartment = new department({
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
        message: "Department create : Bad request"
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
  const id = req.query.id;
  const title = req.body.title;
  try {
    const department = await department.findOne({ _id: id });

    if (department !== null) {
      department.title = title;
      await department.save();
      res.json({ message: "Updated" });
    } else {
      return res.status(400).send({
        error: {
          message: "Department id not found"
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      error: {
        message: "Department update : Bad request"
      }
    });
  }
});

// POSTMAN DELETE: http://localhost:3000/category/delete?id=5dbecb365879af049faec8a4
router.delete("/department/delete", async (req, res) => {
  try {
    const id = req.query.id;
    if (id) {
      // console.log(id);

      const department = await Dategory.findById(id);

      if (department !== null) {
        //console.log(Product.length);

        // Delete Categories
        const categoryList = await Category.findOne();

        // Delete Products
        const productList = await Product.find();
        //res.send(productList);
        //console.log(productList);

        // Remove product
        for (let i = 0; i < productList.length; i++) {
          console.log(id);
          console.log(productList[i].category);

          if (productList[i].category == id) {
            //   console.log(productList[i]._id);
            //   //res.send(productList[i]);

            await productList[i].remove();
            console.log("Product removed");
            //res.send({ message: "Product removed" });
          } else {
            console.log("Not equal");
          }
        }

        // Remove category
        await categoryCur.remove();
        console.log("Category removed");
        res.json({ message: "Category removed" });
      } else {
        return res.status(400).send({
          error: {
            message: "Category id not found"
          }
        });
      }
    } else {
      res.status(400).json({ error: "Wrong parameter" });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

module.exports = router;
