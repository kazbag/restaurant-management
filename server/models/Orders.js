const mongoose = require("mongoose");

const OrdersSchema = mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
  },
  paymentStatus: {
    type: Boolean,
    required: true,
  },
  orderStatus: {
    type: Boolean,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Orders", OrdersSchema);
