import './SubscriptionsWatchedItem.css'
import moment from "moment";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";

const SubscriptionsWatchedItem = ({watchedSubscriptions}) =>{

    const renderDatesOfWatched = watchedSubscriptions.date.map((d, index)=>
        <div key={index} ><Button inverse  to={`/member/${watchedSubscriptions._id}`} >{watchedSubscriptions.name}</Button>   {moment(d).format('MM/DD/YYYY')} </div>

    )

        return (<Card className="movie-item__content"><div className="movie-item">
            <div className="movie-item__info">
                {renderDatesOfWatched}
            </div>
        </div>
        </Card>)
}


export default SubscriptionsWatchedItem;
