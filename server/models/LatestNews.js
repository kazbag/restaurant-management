const mongoose = require("mongoose");

const LatestNewsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  link: {
    type: String,
  },
});
module.exports = mongoose.model("LatestNews", LatestNewsSchema);
