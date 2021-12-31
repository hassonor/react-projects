const axios = require("axios");

const getAllMembersAsync = async() => {
    let resp = await axios.get("http://localhost:3001/api/members");
    const {data} = resp;
    return data;
}

const getMemberByIdAsync = async(_id) => {
    let resp = await axios.get(`http://localhost:3001/api/members/${_id}`);
    const {data} = resp;
    return data;
}

const updateMemberByIdAsync = async (_id, memberToUpdate) => {
    let resp = await axios.put(`http://localhost:3001/api/members/${_id}`,memberToUpdate);
    const {data} = resp;
    return data;
}

const deleteMemberByIdAsync = async (_id) => {
    let resp = await axios.delete(`http://localhost:3001/api/members/${_id}`);
    const {data} = resp;
    return data;
}

const addMemberAsync = async(memberToAdd) => {
    let resp = await axios.post(`http://localhost:3001/api/members`,memberToAdd);
    const {data} = resp;
    return data;
}

module.exports = {
    getAllMembersAsync,
    getMemberByIdAsync,
    deleteMemberByIdAsync,
    updateMemberByIdAsync,
    addMemberAsync
};
