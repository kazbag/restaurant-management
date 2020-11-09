const express = require("express");
const router = express.Router();
const DiscountCodes = require("../models/DiscountCodes");


/**
 * @swagger
 * /discountCodes:
 *  get:
 *    description: use to get all the discount codes
 *    responses: 
 *      '200':
 *        description: succesful repsonse
 */

router.get("/", async (req, res) => {
  try {
    const discountCodes = await DiscountCodes.find();
    res.json(discountCodes);
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 * @swagger
 * /discountCodes/{discountCodeId}:
 *  get:
 *    description: get the discount code based on particular ID
 *    parameters:
 *      - name: discountCodeId
 *        in: path
 *        description: id parameter
 *        type: string
 *    responses: 
 *      '200':
 *        description: succesful repsonse
 */
router.get("/:discountCodeId", async (req, res) => {
  try {
    const discountCodes = await DiscountCodes.findById(
      req.params.discountCodeId
    );
    res.json(discountCodes);
  } catch (err) {
    res.json({ message: err });
  }
});


/**
 * @swagger
 * /discountCodes:
 *  post:
 *    description: get the discount code based on particular ID
 *    parameters:
 *      - name: code
 *        in: formData
 *        type: string
 *      - name: startDate
 *        type: string
 *      - name: expirationDate
 *        type: string
 *      - name: value
 *        type: integer
 *      - name: percentage
 *        type: integer
 *      - name: reusable
 *        type: boolean
 *      - name: used
 *        type: boolean
 *    responses: 
 *      '200':
 *        description: succesful repsonse
 */

router.post("/", async (req, res) => {
  const discountCodes = new DiscountCodes({
    code: req.body.code,
    startDate: req.body.startDate,
    expirationDate: req.body.expirationDate,
    value: req.body.value,
    percentage: req.body.percentage,
    reusable: req.body.reusable,
    used: req.body.used,
  });
  try {
    const savedDiscountCodes = await discountCodes.save();
    res.json(savedDiscountCodes);
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 * @swagger
 * /discountCodes/{discountCodeId}:
 *  delete:
 *    description: delete the discount code based on particular ID
 *    parameters:
 *      - name: discountCodeId
 *        in: path
 *        description: id parameter
 *        type: string
 *    responses: 
 *      '200':
 *        description: succesful repsonse
 */
router.delete("/:discountCodeId", async (req, res) => {
  try {
    const removedDiscountCodes = await DiscountCodes.remove({
      _id: req.params.discountCodeId,
    });
    res.json(removedDiscountCodes);
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 * @swagger
 * /discountCodes/{discountCodeId}:
 *  patch:
 *    description: update the discount code based on particular ID
 *    parameters:
 *      - name: discountCodeId
 *        in: path
 *        description: id parameter
 *        type: string
 *    responses: 
 *      '200':
 *        description: succesful repsonse
 */

router.patch("/:discountCodeId", async (req, res) => {
  try {
    const updatedDiscountCodes = await DiscountCodes.updateOne(
      { _id: req.params.discountCodeId },
      {
        $set: {
          code: req.body.code,
          startDate: req.body.startDate,
          expirationDate: req.body.expirationDate,
          value: req.body.value,
          percentage: req.body.percentage,
          reusable: req.body.reusable,
          used: req.body.used,
        },
      }
    );

    res.json(updatedDiscountCodes);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
