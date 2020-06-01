const mongoose = require('mongoose');

const OrdersSchema = mongoose.Schema({

    price: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        required: true

    },
    paymentStatus: {
        type: Boolean,
        required: true
    },
    orderStatus: {
        type: Boolean,
        required: true
    },
    products: {
        type: Array,
        required: true
    }
});
module.exports = mongoose.model('Orders', OrdersSchema);