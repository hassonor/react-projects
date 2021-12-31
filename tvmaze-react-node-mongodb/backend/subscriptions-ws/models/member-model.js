const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const MemberSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    city: {
        type: String,
    },
}, {versionKey: false, timestamps: true});

const Member = mongoose.model("Member", MemberSchema, "members");

module.exports = Member;
