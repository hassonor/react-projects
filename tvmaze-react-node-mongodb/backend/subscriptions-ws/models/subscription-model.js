const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const {ObjectId} = mongoose.Schema;

const movieOnArraySchema = mongoose.Schema({
    movieId: {type: ObjectId, ref: "Movie"},
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const SubscriptionSchema = mongoose.Schema({
    memberId: {type: ObjectId, ref: "Member"},
    movies: [movieOnArraySchema],
}, {versionKey: false, timestamps: true});

const Subscription = mongoose.model("Subscription", SubscriptionSchema, "subscriptions");

module.exports = Subscription;
