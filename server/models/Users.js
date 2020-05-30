const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    surname: {
        type: String,

    },
    login: {
        type: String,
        minlength: 4,
        maxlength: 15,
        require: true
    },
    password: {
        type: String,
        minlength: 4,
        maxlength: 15,
        require: true
    },
    email: {
        type: String,

    },
    city: {
        type: String,

    },
    role: {
        type: String,
        require: true
    },
});
module.exports = mongoose.model("Users", UsersSchema);