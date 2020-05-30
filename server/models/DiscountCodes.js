const mongoose = require('mongoose');

const DiscountCodesSchema = mongoose.Schema({

    code: {
        type: String,

    },
    startDate: {
        type: Date,
    },
    expirationDate: {
        type: Date,
    },
    value: {
        type: Number,
    },
    percentage: {
        type: Number
    },
    reusable: {
        type: Boolean,
    },
    used: {
        type: Boolean,
    }
})

module.exports = mongoose.model('Discounts', DiscountCodesSchema);