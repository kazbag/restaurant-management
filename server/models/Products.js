const mongoose = require("mongoose");

const ProductsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  photo: {
    type: String,
    unique: true,
  },
});
module.exports = mongoose.model("Products", ProductsSchema);
