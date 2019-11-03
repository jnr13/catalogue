// PRODUCT CRUD

const express = require("express");
const router = express.Router();

const Product = require("../models/product");

router.post("/product/create", async (req, res) => {
  try {
    const newProduct = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category
    });
    await newProduct.save();
    res.json({ message: "New product created" });
  } catch (error) {
    res.status(400).json({
      error: {
        message: error.message
      }
    });
  }
});

router.get("/product", async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

// POSTMAN POST: http://localhost:3000/product/update?id=5dbda719b7ac6006c9a2acbe
router.post("/product/update", async (req, res) => {
  try {
    const id = req.query.id;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;

    const product = await Product.findOne({ _id: id });
    if (product) {
      if (title) {
        product.title = title;
      }
      if (description) {
        product.description = description;
      }
      if (price) {
        product.price = price;
      }
      if (category) {
        product.category = category;
      }
      await product.save();
      res.json({ message: "Product model updated" });
    } else {
      return res.status(400).send({
        error: {
          message: "Product not found"
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

// POSTMAN DELETE: http://localhost:3000/product/delete?id=5dbecb365879af049faec8a4
router.delete("/product/delete", async (req, res) => {
  try {
    const id = req.query.id;
    const product = await Product.findOne({ _id: id });

    if (product) {
      await product.remove();
      res.json({ message: "Product removed" });
    } else {
      return res.status(400).send({
        error: {
          message: "Product not found"
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

module.exports = router;
