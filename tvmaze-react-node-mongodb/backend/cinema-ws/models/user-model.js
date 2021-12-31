const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        min: 6,
        max: 64,
    },
    isAdmin:{
        type: Boolean,
        default: false
    }

}, {versionKey: false, timestamps: true});

const User = mongoose.model("User", UserSchema, "users");

module.exports = User;
