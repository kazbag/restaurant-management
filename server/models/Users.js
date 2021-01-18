const mongoose = require("mongoose");


const UsersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    login: {
        type: String,
        minlength: 1,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 4,
        maxlength: 65,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    city: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    phone: {
        type: Number,
        required: true
    }
});
module.exports = mongoose.model("Users", UsersSchema);