const mongoose = require("mongoose");


const UsersSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,

    },
    login: {
        type: String,
        minlength: 4,
        maxlength: 15,
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
        maxlength: 35,
    },
    email: {
        type: String,
        unique: true
    },
    city: {
        type: String
    },
    role: {
        type: String,
        default: "user"
    },
});
module.exports = mongoose.model("Users", UsersSchema);