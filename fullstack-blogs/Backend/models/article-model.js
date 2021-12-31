const mongoose = require("mongoose");


const CommentSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

const ArticleSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    upvotes: {
        type: Number
    },
    comments: [CommentSchema]
}, { versionKey: false, timestamps: true});

const Teacher = mongoose.model("Teacher", ArticleSchema, "articles");

module.exports = Teacher;
