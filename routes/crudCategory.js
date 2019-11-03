// CATEGORY CRUD

const express = require("express");

const router = express.Router();
const department = require("./../models/department");
const category = require("./../models/category");
const Product = require("./../models/product");

router.post("/category/create", async (req, res) => {
  try {
    const newCategory = new category(
      {
        title: req.body.title,
        description: req.body.description,
        department: req.body.department
      } // or id
    );
    await newCategory.save();
    res.json({ message: "Created" });
  } catch (error) {
    res.status(400).json({
      error: {
        message: "Category create : Bad request"
      }
    });
  }
});

router.get("/category", async (req, res) => {
  try {
    const categories = await category.find();
    res.send(categories);
  } catch (error) {
    res.status(400).json({
      error: {
        message: "Bad request"
      }
    });
  }
});

// POSTMAN POST: http://localhost:3000/category/update?id=5dbda719b7ac6006c9a2acbe
router.post("/category/update", async (req, res) => {
  const id = req.query.id;

  const title = req.body.title;
  const description = req.body.description;
  const department = req.body.department;

  try {
    const categoryCurrent = await category.findOne({ _id: id });

    if (categoryCurrent !== null) {
      if (title) {
        categoryCurrent.title = title;
      }
      if (description) {
        categoryCurrent.description = description;
      }
      if (department) {
        categoryCurrent.department = department;
      }
      await categoryCurrent.save();
      res.json({ message: "Category model updated" });
    } else {
      return res.status(400).send({
        error: {
          message: "Category id not found"
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      error: {
        message: error.message
      }
    });
  }
});

// POSTMAN DELETE: http://localhost:3000/category/delete?id=5dbecb365879af049faec8a4
router.delete("/category/delete", async (req, res) => {
  try {
    const id = req.query.id;
    if (id) {
      // console.log(id);

      const categoryCur = await category.findById(id);

      if (categoryCur !== null) {
        //console.log(Product.length);

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

// router.listen(3000, () => {
//   console.log("Server started");
// });

module.exports = router;
