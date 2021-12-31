const express = require("express");
const {getAllMovies,getMovieById,addMovie,deleteAMovieById, updateMovieById}
    = require("../controller/movies-controller");

const router = express.Router();

router.get("/movies", getAllMovies);
router.get("/movies/:_id", getMovieById);
router.post("/movies",addMovie);
router.delete("/movies/:_id", deleteAMovieById);
router.put("/movies/:_id", updateMovieById);

module.exports = router;
