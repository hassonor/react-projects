const express = require("express");
const {voteAnArticle, addCommentToArticle, getArticle} = require("../controllers-layer/articles-controller");
const router = express.Router();

router.get("/api/articles/:name", getArticle);
router.post("/api/articles/:name/upvote", voteAnArticle);
router.post("/api/articles/:name/add-comment",addCommentToArticle)

module.exports = router;
