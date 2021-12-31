const express = require("express");
const {getAllMembers,getMemberById,deleteAMemberById,addMember, updateMemberById}
    = require("../controllers-layer/members-controller");
const {check} = require("express-validator");
const {requireSignIn} = require("../../subscriptions-ws/middlewares/auth-middleware");

const router = express.Router();

router.get("/members", getAllMembers);
router.get("/members/:_id", getMemberById);

router.post("/members",[
    check('name').not().isEmpty(),
    check('email').isEmail(),
    check('city').not().isEmpty(),
],requireSignIn,addMember);

router.delete("/members/:_id",requireSignIn, deleteAMemberById);

router.put("/members/:_id",requireSignIn, updateMemberById);

module.exports = router;

