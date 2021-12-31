require("../data-access-layer/dal");
const User = require("../models/user-model");
const jsonfile = require("jsonfile");
const path = require("path");

const getAllUsersAsync = () => {
    return new Promise((resolve, reject) => {
        User.find({}, async (err, users) => {
            if (err) {
                reject(err);
            } else {
                resolve(users)
            }
        }).select("-password")
    })
}

const getUserByIdAsync = (_id) => {
    return new Promise((resolve, reject) => {
        User.findById({_id}, (err, user) => {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    })
}

const getExistUserAsync = (username) => {
    return User.findOne({ username }).exec();
}


const deleteUserByIdAsync = (_id) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndDelete(_id, (err) => {
            if (err) {
                reject(err)
            } else {
                deleteUserFromFiles(_id)
                resolve("User were deleted successfully!");
            }
        })
    })
}

const addUserAsync = async (userDataForDB,userToAdd) => {
    let newUserToAdd = new User({
        username: userDataForDB.username,
        password: userDataForDB.password,
    });
    let res =  await newUserToAdd.save();
    res = JSON.stringify(res);
    res = JSON.parse(res);
    const {_id,createdAt} = res;
    const {firstName, lastName, sessionTimeOut} = userToAdd
    const userToAddUsersFile = {
        _id,
        firstName,
        lastName,
        createdDate: createdAt.substr(0,10),
        sessionTimeOut: parseInt(sessionTimeOut)
    }
    addNewUserToJson(userToAddUsersFile);
    updatePermissionsToUser(userToAdd.permissions,_id)
    res.password = undefined;
    return res;
}


const updateUserPermissionsAsync = async(permissions, _id) =>{
    updatePermissionsToUser(permissions,_id, true);
}

const updateUserFromCreatePageAsync = (username,userDataForDB) =>{
    return User.findOneAndUpdate({ username },{
        password: userDataForDB.password
    },{new: true}).exec();
}


const updateUserByIdAsync = (_id, userToUpdate) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(_id,
            {
                username: userToUpdate.username,
            }, (err) => {
                if (err)
                    reject(err)
                else {
                    updateUserOnFile(_id, userToUpdate);
                    updatePermissionsToUser(userToUpdate.permissions,_id, true);
                    resolve("User were updated.");
                }
            })
    })
}

const addNewUserToJson = (userToAddUsersFile) => {
    try{
    jsonfile.readFile(path.join(__dirname,"..","data-access-layer",'Users.json'), (err, data) => {
        if (err) {
            console.log(err);
        } else {
            data.users = [...data.users, userToAddUsersFile]
            //overwriting my file
            writeToFile(data, "Users.json")
        }
    });
        }
        catch(err){
        console.log(err);
        }
}

const updatePermissionsToUser = (permissionsToAdd, _id, isUpdateMode = false) =>{
    try{
        jsonfile.readFile(path.join(__dirname,"..","data-access-layer",'Permissions.json'), (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const index = data.permissions.findIndex(x => x._id === _id);
                if(isUpdateMode && index === -1) return;

                if (index !== -1)
                    data.permissions.splice(index, 1);

                const userToAddPermissions = {
                    _id,
                    permissions: permissionsToAdd
                }
                data.permissions = [...data.permissions, userToAddPermissions]
                //overwriting my file
                writeToFile(data, "Permissions.json")
            }
        });
    }
    catch(err){
        console.log(err);
    }
}

const updateUserOnFile = (_id, userDataToUpdate) => {
    try{
        jsonfile.readFile(path.join(__dirname,"..","data-access-layer",'Users.json'), (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const index = data.users.findIndex(x => x._id === _id);
                if(index === -1) return;


                let userToUpdate = {
                    _id: _id,
                    firstName: userDataToUpdate.firstName,
                    lastName: userDataToUpdate.lastName,
                    createdDate: data.users[index].createdDate,
                    sessionTimeOut: userDataToUpdate.sessionTimeOut
                }

                data.users[index] = userToUpdate;

                //overwriting my file
                writeToFile(data, "Users.json")
            }
        });
    }
    catch(err){
        console.log(err);
    }
}

const getUserDetailsFromFileAsync= (_id) => {
    try{
        return new Promise((resolve, reject) => {
            jsonfile.readFile(path.join(__dirname,"..","data-access-layer",'Users.json'), (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    _id = JSON.parse(JSON.stringify(_id));
                    const index = data.users.findIndex(x => x._id === _id);
                    if(index === -1) return;
                    resolve(data.users[index])
                }
            })
        })
    }
    catch(err){
        console.log(err);
    }
}

const getPermissionsFromFileAsync= (_id) => {
    try{
        return new Promise((resolve, reject) => {
            jsonfile.readFile(path.join(__dirname,"..","data-access-layer",'Permissions.json'), (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    _id = JSON.parse(JSON.stringify(_id));
                    const index = data.permissions.findIndex(x => x._id === _id);
                    if(index === -1) return;
                    resolve(data.permissions[index].permissions)
                }
            })
        })
    }
    catch(err){
        console.log(err);
    }
}


const getAllUsersDetailsFromFileAsync= (_id) => {
    try{
        return new Promise((resolve, reject) => {
            jsonfile.readFile(path.join(__dirname,"..","data-access-layer",'Users.json'), (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.users)
                }
            })
        })
    }
    catch(err){
        console.log(err);
    }
}

const getAllPermissionsFromFileAsync= () => {
    try{
        return new Promise((resolve, reject) => {
            jsonfile.readFile(path.join(__dirname,"..","data-access-layer",'Permissions.json'), (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(data.permissions);
                    resolve(data.permissions)
                }
            })
        })
    }
    catch(err){
        console.log(err);
    }
}





const writeToFile = (obj,fileName) => {
    jsonfile.writeFile(path.join(__dirname,"..","data-access-layer",fileName), obj, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Data Source were updated. ", fileName);
        }
    });
}

const deleteUserFromFiles = (_id) =>{
    try{
        jsonfile.readFile(path.join(__dirname,"..","data-access-layer",'Users.json'), (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const index = data.users.findIndex(x => x._id === _id);
                console.log(index);
                if (index !== -1)
                    data.users.splice(index, 1);
                //overwriting my file
                writeToFile(data, "Users.json")
            }
        });
        jsonfile.readFile(path.join(__dirname,"..","data-access-layer",'Permissions.json'), (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const index = data.permissions.findIndex(x => x._id === _id);
                if (index !== -1)
                    data.permissions.splice(index, 1);
                //overwriting my file
                writeToFile(data, "Permissions.json")
            }
        });
    }
    catch(err){
        console.log(err);
    }
}



module.exports = {
    getAllUsersAsync,
    getUserByIdAsync,
    deleteUserByIdAsync,
    addUserAsync,
    updateUserPermissionsAsync,
    updateUserByIdAsync,
    getExistUserAsync,
    getUserDetailsFromFileAsync,
    updateUserFromCreatePageAsync,
    getPermissionsFromFileAsync,
    getAllUsersDetailsFromFileAsync,
    getAllPermissionsFromFileAsync
};
