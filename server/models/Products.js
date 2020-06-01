const mongoose = require('mongoose');

const ProductsSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true

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
        unique: true

    },
    category: {
        type: String,

    }
})
module.exports = mongoose.model('Products', ProductsSchema);