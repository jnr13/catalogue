// PRODUCT CRUD

const express = require("express");
const router = express.Router();
const product = require("../models/product");

router.post("/product/create", async (req, res) => {
  try {
    const newProduct = new product(
      {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category
      } // or id
    );
    await newProduct.save();
    res.json({ message: "New product created" });
  } catch (error) {
    res.status(400).json({
      error: {
        message: "Product create : Bad request"
      }
    });
  }
});

router.get("/product", async (req, res) => {
  try {
    const products = await product.find();
    res.send(products);
    res.json({ message: "Products read OK" });
  } catch (error) {
    res.status(400).json({
      error: {
        message: "Products read: Bad request"
      }
    });
  }
});

router.put("/product/update", async (req, res) => {
  const id = req.query.id;
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const category = req.body.category;

  try {
    const product = await product.findOne({ _id: id });
    if (product !== null) {
      product.title = title;
      product.description = description;
      product.price = price;
      product.category = category;
      await product.save();
      res.json({ message: "Product model updated" });
    } else {
      return res.status(400).send({
        error: {
          message: "Product id not found"
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      error: {
        message: "Update: Bad request"
      }
    });
  }
});

router.post("/product/delete", async (req, res) => {
  const id = req.query.id;
  try {
    const product = await product.findOne({ _id: id });

    if (product !== null) {
      await product.remove();
      res.json({ message: "Product removed" });
    } else {
      return res.status(400).send({
        error: {
          message: "Product id not found"
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      error: {
        message: "Product delete: Bad request"
      }
    });
  }
});

module.exports = router;
