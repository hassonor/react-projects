const axios = require("axios");

const getAllMoviesAsync = async() => {
    let resp = await axios.get("http://localhost:3001/api/movies");
    const {data} = resp;
    return data;
}

const getMovieByIdAsync = async(_id) => {
    let resp = await axios.get(`http://localhost:3001/api/movies/${_id}`);
    const {data} = resp;
    return data;
}

const updateMovieByIdAsync = async (_id, movieToUpdate) => {
    let resp = await axios.put(`http://localhost:3001/api/movies/${_id}`,movieToUpdate);
    const {data} = resp;
    return data;
}

const deleteMovieByIdAsync = async (_id) => {
    let resp = await axios.delete(`http://localhost:3001/api/movies/${_id}`);
    const {data} = resp;
    return data;
}

const addMovieAsync = async(movieToAdd) => {
    let resp = await axios.post(`http://localhost:3001/api/movies`,movieToAdd);
    const {data} = resp;
    return data;
}

module.exports = {
    getAllMoviesAsync,
    getMovieByIdAsync,
    updateMovieByIdAsync,
    deleteMovieByIdAsync,
    addMovieAsync
};
