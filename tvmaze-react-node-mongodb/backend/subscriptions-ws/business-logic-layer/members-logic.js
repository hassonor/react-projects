require("../data-access-layer/dal");
const Member = require("../models/member-model");
const Subscription = require("../models/subscription-model");
const axios = require("axios");

const getAllMembersAsync = () => {
    return new Promise((resolve, reject) => {
        Member.find({}, async (err, members) => {
            if (err) {
                reject(err);
            } else {
                if (!members.length) {
                    members = await getAllMembersFromJsonPlaceHolderAsync();
                    resolve(members);
                }
                resolve(members)
            }
        })
    })
}

const getMemberByIdAsync = (_id) => {
    return new Promise((resolve, reject) => {
        Member.findById({_id}, (err, member) => {
            if (err) {
                reject(err);
            } else {
                resolve(member);
            }
        });
    })
}

const updateMemberByIdAsync = (_id, memberToUpdate) => {
    return new Promise((resolve, reject) => {
        Member.findByIdAndUpdate(_id,
            {
                name: memberToUpdate.name,
                email: memberToUpdate.email,
                city: memberToUpdate.city
            }, (err) => {
                if (err)
                    reject(err)
                else
                    resolve("Member was Successfully Updated");
            })
    })
}

const deleteMemberByIdAsync = async(_id) => {
    const data = await Subscription.find({"memberId": _id}).exec();
    await Subscription.findByIdAndDelete({_id: data[0]._id}).exec();
    return Member.findByIdAndDelete({_id}).exec()
}


const addMemberAsync = async (memberToAdd) => {
    let newMemberToAdd = new Member({
        name: memberToAdd.name,
        email: memberToAdd.email,
        city: memberToAdd.city
    });
    return  newMemberToAdd.save();

}

const getAllMembersFromJsonPlaceHolderAsync = async () => {
    let resp = await axios.get("https://jsonplaceholder.typicode.com/users");
    const {data} = resp;
    let members = [];

    for (const member of data) {
        let memberInfo = {name: member.name, email: member.email, city: member.address.city}
        let resOfAddMember = await addMemberAsync(memberInfo);
        members.push(resOfAddMember)
    }

    return members;
}

const addMemberToDBAsync = (member) => {
    let memberToAdd = new Member({
        name: member.name,
        email: member.email,
        city: member.city
    });

    return memberToAdd.save();
}

module.exports = {
    getAllMembersAsync,
    getMemberByIdAsync,
    deleteMemberByIdAsync,
    updateMemberByIdAsync,
    addMemberAsync
};
