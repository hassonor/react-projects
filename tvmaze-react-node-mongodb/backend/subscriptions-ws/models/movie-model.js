const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const MovieSchema = mongoose.Schema({
    name: {
        type: String,
    },
    genres: {
        type: [String],
    },
    image: {
        type: String,
    },
    premiered: { type: Date}
}, {versionKey: false, timestamps: true});

const Movie = mongoose.model("Movie", MovieSchema, "movies");

module.exports = Movie;
