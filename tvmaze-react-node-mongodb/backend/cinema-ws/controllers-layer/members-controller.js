import {validationResult} from "express-validator";
import HttpError from "../../subscriptions-ws/models/http-error";

const logic = require("../business-logic-layer/members-logic");

export const getAllMembers = async (req, res)=>{
    try{
        const members = await logic.getAllMembersAsync();
        res.json(members);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
}

export const getMemberById = async (req, res) => {
    try {
        const {_id} = req.params;
        const data = await  logic.getMemberByIdAsync(_id);
        return res.json(data)
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

export const updateMemberById = async (req, res) => {
    try {
        const {_id} = req.params;
        const memberToUpdate = req.body;
        const data = await logic.updateMemberByIdAsync(_id, memberToUpdate);
        return res.json(data)
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

export const deleteAMemberById = async (req, res) => {
    try {
        const {_id} = req.params;
        const status = await logic.deleteMemberByIdAsync(_id);
        return res.json(status);
    } catch (err) {
        return  res.status(500).send(err.message);
    }
};

export const addMember = async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
        return res.status(422).json({message: 'Invalid inputs passed, please check your data.'})
    }
    try {
        const newMemberToAdd = req.body
        const data = await logic.addMemberAsync(newMemberToAdd)
        return res.json(data)
    } catch (err) {
        return res.status(500).send(err.message);
    }
};
