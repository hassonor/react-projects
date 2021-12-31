require("../data-access-layer/dal");
const Movie = require("../models/movie-model");
const axios = require("axios");

const getAllMoviesAsync = () => {
    return new Promise((resolve, reject) => {
        Movie.find({}, async (err, movies) => {
            if (err) {
                reject(err);
            } else {
                if (!movies.length) {
                    movies = await getAllMoviesFromTvMazeAsync();
                    resolve(movies);
                }
                resolve(movies)
            }
        })
    })
}




const getMovieByIdAsync = (_id) => {
    return Movie.findById({_id}).exec();

}

const updateMovieByIdAsync = (_id, movieToUpdate) => {
    return new Promise((resolve, reject) => {
        Movie.findByIdAndUpdate(_id,
            {
                name: movieToUpdate.name,
                genres: movieToUpdate.genres,
                image: movieToUpdate.image,
                premiered: movieToUpdate.premiered
            }, (err) => {
                if (err)
                    reject(err)
                else
                    resolve("Movie was Successfully Updated");
            })
    })
}

const deleteMovieByIdAsync = (id) => {
    return new Promise((resolve, reject) => {
        Movie.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve("Movie were deleted successfully!");
            }
        })
    })
}

const addMovieAsync = (movieToAdd) => {
    let newMovieToAdd = new Movie({
        name: movieToAdd.name,
        genres: movieToAdd.genres,
        image: movieToAdd.image,
        premiered: movieToAdd.premiered
    });

    return newMovieToAdd.save();

}

const getAllMoviesFromTvMazeAsync = async () => {
    let resp = await axios.get("https://api.tvmaze.com/shows");
    const {data} = resp;
    let movies = [];

    for (const movie of data) {
        let movieInfo = {
            name: movie.name,
            genres: movie.genres,
            image: movie.image.original,
            premiered: movie.premiered
        }
        let respFromDb = await addMovieToDBAsync(movieInfo);
        movies.push(respFromDb)
    }

    return movies;
}

const addMovieToDBAsync = (movie) => {
    let movieToAdd = new Movie({
        name: movie.name,
        genres: movie.genres,
        image: movie.image,
        premiered: movie.premiered
    });

    return movieToAdd.save();
}

module.exports = {
    getAllMoviesAsync,
    getMovieByIdAsync,
    deleteMovieByIdAsync,
    addMovieAsync,
    updateMovieByIdAsync
};
