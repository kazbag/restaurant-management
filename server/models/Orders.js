const mongoose = require('mongoose');

const OrdersSchema = mongoose.Schema({

    price: {
        type: Number,
        require: true


    },
    orderDate: {
        type: Date,
        require: true

    },
    paymentStatus: {
        type: Boolean,
        require: true
    },
    orderStatus: {
        type: Boolean,
        require: true
    },
    products: {
        type: Array,
        require: true
    }
});
module.exports = mongoose.model('Orders', OrdersSchema);