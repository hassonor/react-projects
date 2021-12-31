const logic = require("../business-logic-layer/article-logic");

export const voteAnArticle = async(req, res) =>{
    try{
        const articleName = req.params.name;

        const articleInfo = await logic.upVoteArticleAsync(articleName);
        res.status(200).send(articleInfo);

    }
    catch(err){
        console.log(err);
        return res.status(500).send("Error. Please Try Again.");
    }
}

export const addCommentToArticle = async(req, res) =>{
    try{
        const {username, text} = req.body;
        const articleName = req.params.name;

        let addComment = {
            username: username,
            text: text
        }
        const articleInfo = await logic.addCommentAsync(articleName, addComment);

        res.status(200).send(articleInfo);
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Error. Please Try Again.");
    }
}

export const getArticle = async(req, res) =>{
    try{
        const articleName = req.params.name;

        const articleInfo = await logic.getArticleAsync(articleName);

        res.status(200).json(articleInfo);
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Error. Please Try Again.");
    }
}


