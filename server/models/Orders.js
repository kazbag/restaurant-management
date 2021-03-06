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
  /*
  paymentStatus: {
    type: Boolean,
    required: true,
  }
  */
 city: {
   type: String,
   required: true,
 },
  isCompleted: {
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
  phone: {
    type: String,
    required: true,
  },
  userId: {
    type: String
  }
});
module.exports = mongoose.model("Orders", OrdersSchema);




