const express = require("express");
const router = express.Router();
const Orders = require("../models/Orders");



/**
 * @swagger
 * /orders:
 *  get:
 *    description: use to get all orders 
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
 *    description: use to get all orders with status of completed
 *    responses: 
 *      '200':
 *        description: succesful repsonse
 */
router.get("/completed", async (req, res) => {
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
 *    description: use to get all orders with status of pending
 *    responses: 
 *      '200':
 *        description: succesful repsonse
 */
router.get("/pending", async (req, res) => {
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
 *    description: get the order based on particular ID
 *    parameters:
 *      - name: orderId
 *        in: path
 *        description: id parameter
 *        type: string
 *    responses: 
 *      '200':
 *        description: succesful repsonse
 */
router.get("/:orderId", async (req, res) => {
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
 *    description: get the orders based on particular date
 *    parameters:
 *      - name: orderDate
 *        in: path
 *        description: id parameter
 *        type: string
 *    responses: 
 *      '200':
 *        description: succesful repsonse
 */
router.get("/date/:orderDate", async (req, res) => {
  try {
    const dateStart = new Date(req.params.orderDate);
    const orders = await Orders.find({ orderDate: dateStart })
    res.json(orders);
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 * @swagger
 * /orders/date/{orderDateStart}/{orderDateEnd}:
 *  get:
 *    description: get the discount code based on particular ID
 *    parameters:
 *      - name: orderDateStart
 *        in: path
 *        description: date start parameter
 *        type: string
 *      - name: orderDateEnd
 *        in: path
 *        description: date end parameter
 *        type: string
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
 *        type: string
 *      - name: paymentStatus
 *        type: string
 *      - name: orderStatus
 *        type: integer
 *      - name: products
 *        type: array
 *      - name: address
 *        type: string
 *      - name: phone
 *        type: string
 *      - name: price      
 *    responses: 
 *      '200':
 *        description: succesful repsonse
 */
router.post("/", async (req, res) => {
  const order = new Orders({
    price: req.body.price,
    orderDate: req.body.orderDate,
    paymentStatus: req.body.paymentStatus,
    orderStatus: req.body.orderStatus,
    products: req.body.products,
    address: req.body.address,
    phone: req.body.phone,
    price: req.body.price,
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
 *    description: get the discount code based on particular ID
 *    parameters:
 *      - name: orderId
 *        in: path
 *        description: date start parameter
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
 *    description: get the discount code based on particular ID
 *    parameters:
 *      - name: id
 *        in: path
 *        description: date start parameter
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
 *    description: get the discount code based on particular ID
 *    parameters:
 *      - name: orderId
 *        in: path
 *        description: date start parameter
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
          paymentStatus: req.body.paymentStatus,
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
