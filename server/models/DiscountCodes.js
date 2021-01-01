const mongoose = require("mongoose");

const DiscountCodesSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
  },
});

module.exports = mongoose.model("Discounts", DiscountCodesSchema);
