const orders = require("express").Router();

orders.get("/orders", async (req, res) => {
  res.send("ok");
});

module.exports = orders;
