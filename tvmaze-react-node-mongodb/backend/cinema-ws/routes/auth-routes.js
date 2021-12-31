const express = require("express");
const {signup, login} = require("../controllers-layer/auth-controller");
const {requireSignIn} = require("../middlewares/auth-middleware");
const router = express.Router();

router.post("/signup", signup);
router.post("/login",login)

module.exports = router;
