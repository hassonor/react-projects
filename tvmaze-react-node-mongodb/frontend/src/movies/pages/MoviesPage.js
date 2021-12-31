import MoviesList from "../components/MoviesList";
import {useHttpClient} from "../../shared/hooks/http-hook";
import {useEffect, useState} from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const MoviesPage = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedMovies, setLoadedMovies] = useState();

    useEffect(()=>{
        const fetchMovies = async () =>{
            try{
                const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/movies`)
                setLoadedMovies(response);
            }
            catch(err){}
        }
        fetchMovies();
    },[sendRequest])

    const userDeletedHandler = (deleteMovieId) =>{
        setLoadedMovies(prevMovies => prevMovies.filter(movie => movie._id !==  deleteMovieId));
    }


    return (
        <>
            <ErrorModal error={error} onClear={clearError}/>
            {isLoading && <div className="center"><LoadingSpinner/></div> }
            {!isLoading && loadedMovies && <MoviesList items={loadedMovies} onDeleteMovie={userDeletedHandler} />}
        </>
    )
}

export default MoviesPage;
