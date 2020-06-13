const express = require("express");
const router = express.Router();
const Orders = require("../models/Orders");

router.get("/", async (req, res) => {
  try {
    const orders = await Orders.find();
    res.json(orders);
  } catch (err) {
    res.json({ message: err });
  }
});
// completed orders
router.get("/completed", async (req, res) => {
  try {
    const orders = await Orders.find({ orderStatus: true });
    res.json(orders);
  } catch (err) {
    res.json({ message: err });
  }
});
// not completed yet orders
router.get("/pending", async (req, res) => {
  try {
    const orders = await Orders.find({ orderStatus: false });
    res.json(orders);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:orderId", async (req, res) => {
  try {
    const order = await Orders.findById(req.params.orderId);
    res.json(order);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/date/:orderDate", async (req, res) => {
  try {
    const orders = await Orders.find({ orderDate: req.params.orderDate });
    res.json(orders);
  } catch (err) {
    res.json({ message: err });
  }
});

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
