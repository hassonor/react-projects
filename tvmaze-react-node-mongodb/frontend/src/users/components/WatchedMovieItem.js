import './WatchedMovieItem.css'
import moment from "moment";
import Card from "../../shared/components/UIElements/Card";

const WatchedMovieItem = ({watchedMovie}) =>{
        return (<Card className="movie-item__content">
            <div className="movie-item">
            <div className="movie-item__info">
                <p><a>{watchedMovie.name}, {moment(watchedMovie.date).format('MM/DD/YYYY')}</a></p>
            </div>
            </div>
                </Card>)

}


export default WatchedMovieItem;
