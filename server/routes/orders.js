const express = require("express");
const router = express.Router();
const Orders = require("../models/Orders");
const DiscountCodes = require("../models/DiscountCodes");
const { getAuth } = require("../SessionService");
/**
 * @swagger
 * /orders:
 *  get:
 *    description: get all orders
 *    responses:
 *      '200':
 *        description: succesful repsonse
 */
router.get("/", async (req, res) => {
  try {
    const orders = await Orders.find();
    res.json(orders);
  } catch (err) {
    res.json({ message: err });
  }
});
// completed orders

/**
 * @swagger
 * /orders/completed:
 *  get:
 *    description: get all orders with completed status
 *    responses:
 *      '200':
 *        description: succesful repsonse
 */
router.get("/completed", getAuth("chef"), async (req, res) => {
  try {
    const orders = await Orders.find({ orderStatus: true });
    res.json(orders);
  } catch (err) {
    res.json({ message: err });
  }
});
// not completed yet orders
/**
 * @swagger
 * /orders/pending:
 *  get:
 *    description: use to get all orders with pending status
 *    responses:
 *      '200':
 *        description: succesful repsonse
 */
router.get("/pending", getAuth("chef"), async (req, res) => {
  try {
    const orders = await Orders.find({ orderStatus: false });
    res.json(orders);
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 * @swagger
 * /orders/{orderId}:
 *  get:
 *    description: get the order with particular Id
 *    parameters:
 *      - name: orderId
 *        in: path
 *        description: id parameter of the order
 *        type: string
 *    responses:
 *      '200':
 *        description: succesful repsonse
 */
router.get("/:orderId", getAuth("chef"), async (req, res) => {
  try {
    const order = await Orders.findById(req.params.orderId);
    res.json(order);
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 * @swagger
 * /orders/date/{orderDate}:
 *  get:
 *    description: get the orders with a particular date
 *    parameters:
 *      - name: orderDate
 *        in: path
 *        description: the date of the order
 *        type: date
 *    responses:
 *      '200':
 *        description: succesful repsonse
 */
router.get("/date/:orderDate", async (req, res) => {
  try {
    const dateStart = new Date(req.params.orderDate);
    const orders = await Orders.find({ orderDate: dateStart });
    res.json(orders);
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 * @swagger
 * /orders/date/{orderDateStart}/{orderDateEnd}:
 *  get:
 *    description: get the orders between two dates
 *    parameters:
 *      - name: orderDateStart
 *        in: path
 *        description: date start parameter
 *        type: date
 *      - name: orderDateEnd
 *        in: path
 *        description: date end parameter
 *        type: date
 *    responses:
 *      '200':
 *        description: succesful repsonse
 */
router.get("/date/:orderDateStart/:orderDateEnd", async (req, res) => {
  try {
    const dateStart = new Date(req.params.orderDateStart);
    const dateEnd = new Date(req.params.orderDateEnd);
    const finalOrders = await Orders.find(
      { orderDate: { $gte: dateStart } } && { orderDate: { $lte: dateEnd } }
    );
    res.json(finalOrders);
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 * @swagger
 * /orders:
 *  post:
 *    description: post the order
 *    parameters:
 *      - name: price
 *        in: formData
 *        type: integer
 *      - name: orderDate
 *        in: formData
 *        type: date
 *      - name: orderStatus
 *        in: formData
 *        type: string
 *      - name: products
 *        in: formData
 *        type: array
 *      - name: address
 *        in: formData
 *        type: string
 *      - name: phone
 *        in: formData
 *        type: string
 *      - name: userId
 *        in: formData
 *        type: string
 *    responses:
 *      '200':
 *        description: succesful repsonse
 */
router.post("/", async (req, res) => {
  console.log(req);
  const products = req.body.products;
  const code = req.body.code;
  // check that is code valid
  const retreivedCode = await DiscountCodes.findOne({ code: code });
  const orderRatio = retreivedCode ? 1 - retreivedCode.value : 1;
  const finalPrice =
    req.body.products.reduce((a, b) => +a + +b.price, 0) * orderRatio;

  const order = new Orders({
    price: finalPrice,
    orderDate: new Date(),
    orderStatus: true,
    products: req.body.products,
    address: req.body.address,
    phone: req.body.phone,
    userId: req.body.userId,
  });
  try {
    const savedOrder = await order.save();
    res.json(savedOrder);
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 * @swagger
 * /orders/{orderId}:
 *  delete:
 *    description: delete the order with particular Id
 *    parameters:
 *      - name: orderId
 *        in: path
 *        description: id parameter of the order
 *        type: string
 *    responses:
 *      '200':
 *        description: succesful repsonse
 */
router.delete("/:orderId", async (req, res) => {
  try {
    const removedOrder = await Orders.remove({
      _id: req.params.orderId,
    }).exec();
    console.log("usunięto");
    res.json(removedOrder);
  } catch (err) {
    res.json({ message: err });
  }
});

// toggle status
/**
 * @swagger
 * /orders/status/{id}:
 *  patch:
 *    description: update the order status with particular Id
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id of the order
 *        type: string
 *      - name: status
 *        in: formData
 *        description: updated status
 *        type: string
 *    responses:
 *      '200':
 *        description: succesful repsonse
 */
router.patch("/status/:id", async (req, res) => {
  try {
    const order = await Orders.findOne({ _id: req.params.id });
    const status = order.orderStatus;
    const updatedOrder = await Orders.updateOne(
      { _id: req.params.id },
      { $set: { orderStatus: !status } }
    ).exec();
    res.json(updatedOrder);
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 * @swagger
 * /orders/{orderId}:
 *  patch:
 *    description: update the order with particular Id
 *    parameters:
 *      - name: orderId
 *        in: path
 *        description: id of the order
 *        type: string
 *      - name: price
 *        in: formData
 *        type: integer
 *      - name: orderDate
 *        in: formData
 *        type: date
 *      - name: orderStatus
 *        in: formData
 *        type: date
 *      - name: products
 *        in: formData
 *        type: array
 *      - name: phone
 *        in: formData
 *        type: string
 *      - name: address
 *        in: formData
 *        type: string
 *    responses:
 *      '200':
 *        description: succesful repsonse
 */
router.patch("/:orderId", async (req, res) => {
  try {
    const updatedOrder = await Orders.updateOne(
      { _id: req.params.orderId },
      {
        $set: {
          price: req.body.price,
          orderDate: req.body.orderDate,
          orderStatus: req.body.orderStatus,
          products: req.body.products,
          phone: req.body.phone,
          address: req.body.address,
        },
      }
    );

    res.json(updatedOrder);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
