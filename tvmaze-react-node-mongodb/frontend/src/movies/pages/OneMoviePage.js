import {useHistory, useParams} from "react-router-dom";
import {useHttpClient} from "../../shared/hooks/http-hook";
import {useEffect, useState} from "react";
import {useForm} from "../../shared/hooks/form-hooks";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import moment from "moment";
import DisabledInput from "../../shared/components/FormElements/DisabledInput";

const OneMoviePage = ()=> {
    let history = useHistory();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedMovie, setLoadedMovie] = useState();
    const _id = useParams()._id;

    const [, inputHandler, setFormData] = useForm({
        name:{
            value: '',
            isValid: false
        },
        genres:{
            value: '',
            isValid: false
        },
        image_url:{
            value: '',
            isValid: false
        },
        premiered:{
            value: '',
            isValid: false
        }
    },false)


    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/movies/${_id}`
                );
                setLoadedMovie(responseData);

                setFormData({
                    name:{
                        value: responseData.name,
                        isValid: true
                    },
                    genres:{
                        value: responseData.genres.toString(),
                        isValid: true
                    },
                    image_url:{
                        value: responseData.image,
                        isValid: true
                    },
                    premiered:{
                        value: responseData.premiered,
                        isValid: true
                    }
                }, true)

            } catch (err) {}
        };
        fetchMovie();
    }, [sendRequest, _id, setFormData]);




    const handleBack = () => {
        history.push("/members");
    }

    if (isLoading) {
        return (
            <div className="center">
                <Card>
                    <LoadingSpinner/>
                </Card>
            </div>
        )
    }

    if (!loadedMovie && !error) {
        return (
            <div className="center">
                <h2>Could not find the Movie!</h2>
            </div>
        )
    }

    return (<>
            <ErrorModal error={error} onClear={clearError}/>
            {!isLoading && loadedMovie &&
            <Card className="card-form">
                    <DisabledInput id="name"
                           element="input"
                           type="text"
                           label="Name"
                           errorTest="Please enter a valid Name"
                           onInput={inputHandler}
                           initialValue={loadedMovie.name}
                           initialValid={true}/>
                    <DisabledInput id="genres"
                           element="input"
                           type="text"
                           label="Genres"
                           errorTest="Please enter a valid Genres"
                           onInput={inputHandler}
                           initialValue={loadedMovie.genres}
                           initialValid={true}/>
                    <DisabledInput  id="image_url"
                            element="input"
                            type="text"
                            label="Image url"
                            errorTest="Please enter a valid Image url"
                            onInput={inputHandler}
                            initialValue={loadedMovie.image}
                            initialValid={true}/>
                    <DisabledInput id="premiered" element="input"
                           type="date" label="Premiered"
                           errorTest="Please enter a valid Premiered"
                           onInput={inputHandler}
                           initialValue={(moment(loadedMovie.premiered).format("YYYY-MM-DD"))}
                           initialValid={true}/>
                    <Button onClick={handleBack} inverse>BACK</Button>
              </Card>}
        </>
    )
}


export default OneMoviePage;
