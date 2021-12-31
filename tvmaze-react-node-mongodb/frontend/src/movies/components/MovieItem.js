import './MovieItem.css';
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Avatar from "../../shared/components/UIElements/Avatar";
import moment from "moment";
import Modal from "../../shared/components/UIElements/Modal";
import {useContext, useEffect, useState} from "react";
import {useHttpClient} from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import SubscriptionsWatchedItem from "./SubscriptionsWatchedItem";
import {AuthContext} from "../../shared/context/auth-context";
import Restricted from "../../shared/permissions/Restricted";
import PermissionProvider from "../../shared/permissions/providers/permission-provider";
import axios from "axios";

const MovieItem = ({movie,onDelete}) => {
    const {error, sendRequest, clearError} = useHttpClient();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [loadedWatched, setLoadedWatched] = useState([])
    const auth = useContext(AuthContext);

    useEffect(()=>{
        const source = axios.CancelToken.source()
        const fetchWatched = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/subscriptions/by-movie/${movie._id}`, {
                    cancelToken: source.token,
                })
                setLoadedWatched(Object.values(response.data));
            } catch (error) {
                if (axios.isCancel(error)) {
                } else {
                    throw error
                }
            }
        }
        fetchWatched();

        return () => {
            source.cancel()
        }

    },[movie])

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    }

    const cancelDeleteHandler = () =>{
        setShowConfirmModal(false);
    }

    const confirmDeleteHandler = async () =>{
        setShowConfirmModal(false);
        try{
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/movies/${movie._id}`,
                'DELETE',
                null,
                {
                    Authorization: 'Bearer ' + auth.token
                }
            );
            onDelete(movie._id);
        }
        catch(err){

        }
    }

    return (
        <>
            <ErrorModal error={error} onClear={clearError}/>
        <Modal
            show={showConfirmModal}
            onCancel={cancelDeleteHandler}
            header="Are you sure?"
            footerClass="movie-item__modal-actions"
            footer={
            <>
                <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
            </>
        } >
            <p>Do you want to proceed and delete this movie? </p>
        </Modal>
        <div className="movie-item">
            <Card className="movie-item__content">
                <div className="movie-item__info">
                    <h2><b>{movie.name}, {moment(movie.premiered).format("YYYY")}</b> </h2>
                </div>
                <div className="movie-item__info">
                    <b>genres:</b> <span>{movie.genres.toString()}</span>
                </div>
                <div className="center">
                    <Avatar image={movie.image} alt={movie.name} />
                </div>
                <br/>
                {loadedWatched &&
                    <>
                <div className="movie-item__info">
                    <h2>Subscriptions Watched</h2>
                <ul className="movie-item__content">
                    {loadedWatched.map((watchedSubscriptions => <SubscriptionsWatchedItem key={watchedSubscriptions._id}
                                                                                               watchedSubscriptions={watchedSubscriptions} />))}
                </ul>
                </div></>}

                <PermissionProvider permissions={auth.permissions}>
                <div className="center">
                    <Restricted to="Update Movies">
                <Button inverse  to={`/movies/${movie._id}`} >EDIT</Button>
                    </Restricted>
                    <Restricted to="Delete Movies">
                <Button danger onClick={showDeleteWarningHandler}>Delete</Button>
                    </Restricted>
                </div>
                </PermissionProvider>
            </Card>
        </div>
        </>
    );
};

export default MovieItem;
