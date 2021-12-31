import './MoviesWatched.css'
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";

const MoviesWatched = ({movieWatched}) => {

    return (<Card className="movie-item__content">
        <div className="movie-item">
            <div className="movie-item__info">
                <div>
                    <div><Button inverse
                                 to={`/movie/${movieWatched._id}`}>{movieWatched.name}</Button> {movieWatched.date}
                    </div>
                </div>
            </div>
        </div>
    </Card>)
}

export default MoviesWatched;
