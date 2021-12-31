import moment from "moment";

const logic = require("../business-logic-layer/users-logic");

export const getAllUsers = async (req, res)=>{
    try{
        const dataFromDB = await logic.getAllUsersAsync();
        const dataFromUsersFile =   await logic.getAllUsersDetailsFromFileAsync();

        const allUsersData = []
        try {
            for (let i = 0; i < dataFromDB.length; i++) {

                let newObj = {
                    _id: JSON.parse(JSON.stringify(dataFromDB[i]._id)),
                    name: dataFromUsersFile[i].firstName + " " + dataFromUsersFile[i].lastName,
                    username: dataFromDB[i].username,
                    sessionTimeOut: dataFromUsersFile[i].sessionTimeOut,
                    createdData: moment(dataFromDB[i].createdAt).format("DD/MM/YYYY"),
                    permissions: await logic.getPermissionsFromFileAsync(dataFromDB[i]._id) || ""
                }
                allUsersData.push(newObj)
            }
        }
        catch(err){
            console.log(err);
            return res.status(500).send("Something went wrong.");
        }

        res.json(allUsersData);
    }
    catch(err){
        return res.status(500).send("Something went wrong.");
    }
}

export const getUserById = async (req, res) => {
    try {
        const {_id} = req.params;
        const dataFromDB = await  logic.getUserByIdAsync(_id);
        const dataFromFile =   await logic.getUserDetailsFromFileAsync(_id);
        const getPermissions = await logic.getPermissionsFromFileAsync(_id);

        const userAllData = {
            _id,
            firstName: dataFromFile.firstName,
            lastName: dataFromFile.lastName,
            username: dataFromDB.username,
            sessionTimeOut: dataFromFile.sessionTimeOut,
            createdData: moment(dataFromDB.createdAt).format("DD/MM/YYYY"),
            permissions: getPermissions.toString()
        }
        return res.json(userAllData)
    } catch (err) {
        return res.status(500).send("Something went wrong.");
    }
};

export const deleteAUserById = async (req, res) => {
    try {
        const {_id} = req.params;
        const status = await logic.deleteUserByIdAsync(_id);
        return res.json(status);
    } catch (err) {
        return res.status(500).send("Something went wrong.");
    }
};

export const addUser = async (req, res) => {
    try {
        const newUserToAdd = req.body
        const {username} = newUserToAdd;
        const initialPassword = "12341234";
        const userDataForDB = {
            username,
            password: initialPassword
        }

        let {firstName,lastName,sessionTimeOut,permissions} = newUserToAdd

        if(!permissions){
            permissions = ["View Subscriptions","View Movies"]
        }

        const userToAdd = {
            firstName,
            lastName,
            sessionTimeOut,
            permissions
        }
        const data = await logic.addUserAsync(userDataForDB,userToAdd)
        return res.json(data)
    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
};

export const updateUserPermissionsById = async(req,res) =>{
    try{
        const {_id} = req.params;
        const {permissions} = req.body
        await logic.updateUserPermissionsAsync(permissions, _id);
        return res.status(200).send("User permissions were updated.");
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

export const getUserPermissionsById = async(req,res) =>{
    try{
        const {_id} = req.params;
        const permissions = await logic.getPermissionsFromFileAsync(_id);
        return res.status(200).send(permissions);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

export const updateUserById = async (req, res) => {
    try {
        let _id = req.params._id
        let userToUpdate = req.body;
        console.log(userToUpdate);
        let data = await logic.updateUserByIdAsync(_id, userToUpdate);
        return res.json(data)
    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
};
