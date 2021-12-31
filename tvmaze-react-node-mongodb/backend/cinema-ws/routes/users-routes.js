const express = require("express");
const {getAllUsers, getUserById, deleteAUserById, addUser,updateUserPermissionsById,updateUserById,getUserPermissionsById}
    = require("../controllers-layer/users-controller");
const {requireSignIn} = require("../middlewares/auth-middleware");

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:_id", getUserById);
router.get("/users/permissions/:_id",getUserPermissionsById);
router.post("/users",requireSignIn,addUser);
router.delete("/users/:_id",requireSignIn, deleteAUserById);
router.put("/users/:_id",requireSignIn, updateUserById);
router.put("/users/permissions/:_id",updateUserPermissionsById)


module.exports = router;

