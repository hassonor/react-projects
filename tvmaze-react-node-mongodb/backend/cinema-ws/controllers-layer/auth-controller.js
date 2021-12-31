import User from "../models/user-model";

const logic = require("../business-logic-layer/users-logic");
const { hashPassword, comparePassword } = require("../helpers/auth-helper.js");
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await logic.getExistUserAsync(username);
    if (!user) {
      return res.status(401).send("User not found");
    }

    //check password with the hashed password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send("Wrong password or username.");
    }

    //creating jwt web token for the logged user.
    const token = jwt.sign(
      { _id: user._id, username: user.username },
      config.JWT_SECRET,
      { expiresIn: "1h" }
    );
    user.password = undefined;
    const data = await logic.getUserDetailsFromFileAsync(user._id);
    const getPermissions = await logic.getPermissionsFromFileAsync(user._id);
    const { firstName, lastName,sessionTimeOut } = data;
    res.json({
      token,
      name: firstName + " " + lastName,
      isAdmin: user.isAdmin,
      permissions: getPermissions,
      sessionTimeOut: sessionTimeOut
    });
  } catch (err) {
    return res.status(400).send("Error. Please Try Again.");
  }
};

export const signup = async (req, res) => {
  const newUserToAdd = req.body;
  const { username, password } = newUserToAdd;

  //validate params from body.
  if (!username) {
    return res.status(400).send("Username is required");
  }
  if (!password || password.length < 6) {
    return res
      .status(500)
      .send("Password is required and should be at least 6 characters.");
  }

  //hash salted the password.
  const hashedPassword = await hashPassword(password);

  let userDataForDB = new User({ username, password: hashedPassword });

  //verify the user not exist.
  const exist = await logic.getExistUserAsync(username);
  try {
    if (exist) {
      const details = await logic.updateUserFromCreatePageAsync(
        username,
        userDataForDB
      );
      return res.status(200).send(details);
    } else {
      return res.status(400).send("User doesn't exists.");
    }
  } catch (err) {
    console.log("REGISTER FAILED => ", err);
    return res.status(400).send("Error occurred. Please try again.");
  }
};
