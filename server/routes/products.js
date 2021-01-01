const express = require("express");
const router = express.Router();
const Products = require("../models/Products");

/**
 * @swagger
 * /products:
 *  get:
 *    description: get all the products
 *    responses:
 *      '200':
 *        description: succesful repsonse
 */
router.get("/", async (req, res) => {
  try {
    const products = await Products.find();
    res.json(products);
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 * @swagger
 * /prodcuts/{productId}:
 *  get:
 *    description: get the product with particular Id
 *    parameters:
 *      - name: productId
 *        in: path
 *        description: id parameter of the product
 *        type: string
 *    responses:
 *      '200':
 *        description: succesful repsonse
 */
router.get("/:productId", async (req, res) => {
  try {
    const product = await Products.findById(req.params.productId);
    res.json(product);
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 * @swagger
 * /products:
 *  post:
 *    description: post the products
 *    parameters:
 *      - name: name
 *        in: formData
 *        type: string
 *      - name: price
 *        in: formData
 *        type: integer
 *      - name: description
 *        in: formData
 *        type: string
 *      - name: photo
 *        in: formData
 *        type: string
 *      - name: category
 *        in: formData
 *        type: string
 *    responses:
 *      '200':
 *        description: succesful repsonse
 */
router.post("/", async (req, res) => {
  const product = new Products({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    photo: req.body.photo,
    category: req.body.category,
  });
  try {
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 * @swagger
 * /products/{productId}:
 *  delete:
 *    description: delete the product with particular Id
 *    parameters:
 *      - name: productId
 *        in: path
 *        description: id parameter of the product
 *        type: string
 *    responses:
 *      '200':
 *        description: succesful repsonse
 */
router.delete("/:productId", async (req, res) => {
  try {
    const removedProducts = await Products.remove({
      _id: req.params.productId,
    });
    res.json(removedProducts);
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 * @swagger
 * /prodcuts/{productId}:
 *  patch:
 *    description: patch the discount code based on particular ID
 *    parameters:
 *      - name: productId
 *        in: path
 *        description: date start parameter
 *        type: string
 *      - name: name
 *        in: formData
 *        type: string
 *      - name: price
 *        in: formData
 *        type: integer
 *      - name: description
 *        in: formData
 *        type: string
 *      - name: photo
 *        in: formData
 *        type: string
 *        description: the URL of the photo
 *      - name: category
 *        in: formData
 *        type: string
 *    responses:
 *      '200':
 *        description: succesful repsonse
 */
router.patch("/:productId", async (req, res) => {
  try {
    const updatedProducts = await Products.updateOne(
      { _id: req.params.productId },
      {
        $set: {
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          photo: req.body.photo,
          category: req.body.category,
        },
      }
    );

    res.json(updatedProducts);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
