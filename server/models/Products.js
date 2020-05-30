const mongoose = require('mongoose');

const ProductsSchema = mongoose.Schema({

    name: {
        type: String,
        require: true,

    },
    price: {
        type: Number,
        require: true,

    },
    description: {
        type: String,

    },
    photo: {
        type: String,

    },
    category: {
        type: String,
    }
})
module.exports = mongoose.model('Products', ProductsSchema);