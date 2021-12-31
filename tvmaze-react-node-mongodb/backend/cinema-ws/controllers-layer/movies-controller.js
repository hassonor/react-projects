const logic = require("../business-logic-layer/movies-logic");

export const getAllMovies = async (req, res)=>{
    try{
        const members = await logic.getAllMoviesAsync();
        res.json(members);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
}

export const getMovieById = async (req, res) => {
    try {
        const _id = req.params._id;
        let data = await  logic.getMovieByIdAsync(_id);
        return res.json(data)
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

export const updateMovieById = async (req, res) => {
    try {
        let _id = req.params._id
        let movieToUpdate = req.body;
        let data = await logic.updateMovieByIdAsync(_id, movieToUpdate);
        return res.json(data)
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

export const deleteAMovieById = async (req, res) => {
    try {
        const _id = req.params._id
        let status = await logic.deleteMovieByIdAsync(_id);
        return res.json(status);
    } catch (err) {
        return  res.status(500).send(err.message);
    }
};


export const addMovie = async (req, res) => {
    try {
        let mewMovieToAdd = req.body
        let data = await logic.addMovieAsync(mewMovieToAdd)
        return res.json(data)
    } catch (err) {
        return res.status(500).send(err.message);
    }
};
