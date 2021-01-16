const express = require("express");
const router = express.Router();
const DiscountCodes = require("../models/DiscountCodes");
const { getAuth } = require("../SessionService");
/**
 * @swagger
 * /discountCodes:
 *  get:
 *    description: get all the discount codes
 *    responses:
 *      '200':
 *        description: succesful repsonse
 */

router.get("/", getAuth("employee"), async (req, res) => {
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
 *    description: get the discount code with particular code
 *    parameters:
 *      - name: code
 *        in: path
 *        description: code parameter of discount code
 *        type: string
 *    responses:
 *      '200':
 *        description: succesful repsonse
 */
router.get("/:code", getAuth(["employee", "user"]), async (req, res) => {
  try {
    const code = await DiscountCodes.findOne({
      code: req.params.code,
    });
    if (!code) {
      const response = {
        code_submitted: false,
        ratio: 1,
        error: true,
      };
      res.json(response);
    } else {
      const response = {
        code_submitted: true,
        ratio: 1 - code.value,
        error: false,
      };
      res.json(response);
    }
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 * @swagger
 * /discountCodes:
 *  post:
 *    description: post the discount code
 *    parameters:
 *      - name: code
 *        in: formData
 *        type: string
 *      - name: startDate
 *        in: formData
 *        type: string
 *      - name: expirationDate
 *        in: formData
 *        type: string
 *      - name: value
 *        in: formData
 *        type: integer
 *      - name: percentage
 *        in: formData
 *        type: integer
 *      - name: reusable
 *        in: formData
 *        type: boolean
 *      - name: used
 *        in: formData
 *        type: boolean
 *    responses:
 *      '200':
 *        description: succesful repsonse
 */

router.post("/", getAuth("admin"), async (req, res) => {
  const discountCodes = new DiscountCodes({
    code: req.body.code,
    value: parseInt(req.body.value) / 100,
  });
  try {
    if (!discountCodes.code)
      return res
        .status(500)
        .json({ error: { message: "brak danych wejsciowych" } });
    const savedDiscountCodes = await discountCodes.save((error) => {
      if (error) {
        res.status(400).json({ error: { message: "podany kod juz istnieje" } });
      } else res.json(savedDiscountCodes);
    });
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 * @swagger
 * /discountCodes/{discountCodeId}:
 *  delete:
 *    description: delete the discount code with particular Id
 *    parameters:
 *      - name: discountCodeId
 *        in: path
 *        description: id parameter of discount code
 *        type: string
 *    responses:
 *      '200':
 *        description: succesful repsonse
 */
router.delete("/:discountCodeId", getAuth("admin"), async (req, res) => {
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
 *    description: update the discount code with particular ID
 *    parameters:
 *      - name: discountCodeId
 *        in: path
 *        description: id parameter
 *        type: string
 *      - name: code
 *        in: formData
 *        type: string
 *      - name: startDate
 *        in: formData
 *        type: date
 *      - name: expirationDate
 *        in: formData
 *        type: date
 *      - name: value
 *        in: formData
 *        type: integer
 *      - name: percentage
 *        in: formData
 *        type: boolean
 *        description: Is it percentage value
 *      - name: reusable
 *        in: formData
 *        type: boolean
 *      - name: used
 *        in: formData
 *        type: boolean
 *    responses:
 *      '200':
 *        description: succesful repsonse
 */

router.patch("/:discountCodeId", getAuth("admin"), async (req, res) => {
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
