const express = require("express");
const {getAllMovies,getMovieById,addMovie,deleteAMovieById, updateMovieById}
    = require("../controllers-layer/movies-controller");
const {requireSignIn} = require("../../subscriptions-ws/middlewares/auth-middleware");

const router = express.Router();

router.get("/movies", getAllMovies);
router.get("/movies/:_id", getMovieById);
router.post("/movies",requireSignIn,addMovie);
router.delete("/movies/:_id",requireSignIn, deleteAMovieById);
router.put("/movies/:_id",requireSignIn, updateMovieById);

module.exports = router;
