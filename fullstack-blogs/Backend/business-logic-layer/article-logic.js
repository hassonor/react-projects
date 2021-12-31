require("../data-access-layer/dal");
const Article = require("../models/article-model.js")

const getArticleAsync = (articleName) => {
    return new Promise((resolve, reject) => {
        Article.findOne({name: articleName}, (err, article) => {
            if (err) {
                reject(err);
            } else {
                resolve(article);
            }
        });
    })
}

const upVoteArticleAsync = (articleName) => {
    return Article.findOneAndUpdate({name: articleName},{ $inc: { upvotes: 1 }},
        {new: true}).exec();
}

const addCommentAsync = (articleName, comment) =>{
    return Article.findOneAndUpdate({name: articleName},
        {$push: {"comments":comment}},
        {upsert: true, new : true}).exec();
}





module.exports = {
    getArticleAsync,
    upVoteArticleAsync,
    addCommentAsync
}
