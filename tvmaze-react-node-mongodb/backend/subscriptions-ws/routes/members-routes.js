const express = require("express");
const {getAllMembers,getMemberById,deleteAMemberById,addMember, updateMemberById}
    = require("../controller/members-controller");

const router = express.Router();

router.get("/members", getAllMembers);
router.get("/members/:_id", getMemberById);
router.post("/members",addMember);
router.delete("/members/:_id", deleteAMemberById);
router.put("/members/:_id", updateMemberById);

module.exports = router;

