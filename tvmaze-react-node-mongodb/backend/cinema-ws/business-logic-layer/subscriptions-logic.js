const axios = require("axios");

const getAllSubscriptionsAsync = async () => {
    let resp = await axios.get("http://localhost:3001/api/subscriptions");
    const {data} = resp;
    return data;
}

const getSubscriptionByIdAsync = async (_id) => {
    let resp = await axios.get(`http://localhost:3001/api/subscriptions/${_id}`);
    const {data} = resp;
    return data;
}

const updateSubscriptionByIdAsync = async (_id, movieToUpdate) => {
    let resp = await axios.put(`http://localhost:3001/api/subscriptions/${_id}`, movieToUpdate);
    const {data} = resp;
    return data;
}

const deleteSubscriptionByIdAsync = async (_id) => {
    let resp = await axios.delete(`http://localhost:3001/api/subscriptions/${_id}`);
    const {data} = resp;
    return data;
}

const addSubscriptionAsync = async (subscriptionToAdd) => {
    let resp = await axios.post(`http://localhost:3001/api/subscriptions`, subscriptionToAdd);
    const {data} = resp;
    return data;
}

const addMovieToSubscriptionAsync = async (_id, movieWithDateToAdd) => {
    let resp = await axios.put(`http://localhost:3001/api/add/movie/subscriptions/${_id}`, movieWithDateToAdd);
    const {data} = resp;
    return data;
}

const removeMovieFromSubscriptionAsync = async (_id, movieId) => {
    let resp = await axios.put(`http://localhost:3001/api/remove/movie/subscriptions/${_id}`, {movieId});
    const {data} = resp;
    return data;
}

const removeMovieFromAllSubscriptionAsync = async (movieId) => {
    let resp = await axios.put(`http://localhost:3001/api/remove/movie/all/subscriptions`, {movieId});
    const {data} = resp;
    return data;
}

const findAllMembersFromSubscriptionsForMovieByIdAsync = async (_id) => {
    let resp = await axios.get(`http://localhost:3001/api/subscriptions/by-movie/${_id}`);
    const {data} = resp;
    return data;
}

const findAllWatchedMoviesForSubscriptionByMemberAsync = async (_id) => {
    let resp = await axios.get(`http://localhost:3001/api/subscriptions/by-member/${_id}`);
    const {data} = resp;
    return data;
}


const findSubscriberByMemberIdAsync = async (_id) => {
    let resp = await axios.get(`http://localhost:3001/api/subscriptions/get-subscriber-by-id/${_id}`);
    const {data} = resp;
    return data;
}


module.exports = {
    getAllSubscriptionsAsync,
    getSubscriptionByIdAsync,
    updateSubscriptionByIdAsync,
    deleteSubscriptionByIdAsync,
    addSubscriptionAsync,
    addMovieToSubscriptionAsync,
    removeMovieFromSubscriptionAsync,
    removeMovieFromAllSubscriptionAsync,
    findAllMembersFromSubscriptionsForMovieByIdAsync,
    findAllWatchedMoviesForSubscriptionByMemberAsync,
    findSubscriberByMemberIdAsync
};
