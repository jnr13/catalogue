// CATEGORY CRUD

const express = require("express");

const router = express.Router();
const department = require("./../models/department");
const category = require("./../models/category");
const product = require("./../models/product");

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
      categoryCurrent.title = title;
      categoryCurrent.description = description;
      categoryCurrent.department = department;
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
      console.log(id);

      const categoryCur = await category.findById({ id });
      console.log("After" + id);

      if (categoryCur !== null) {
        // Remove products under/with same id than category
        console.log("CATEGORY");
        res.send(categoryCur);

        //if (product.category === id) {
        const productCur = await product.findOne({ _id: id });
        if (productCur !== null) {
          console.log("PRODUCTS in the category : " + product);
          res.send(productCur);
        }
        //}

        // Remove categorie
        // await category.remove();
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
