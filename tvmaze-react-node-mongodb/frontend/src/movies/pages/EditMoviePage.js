import {useHistory, useParams} from "react-router-dom";
import {AuthContext} from "../../shared/context/auth-context";
import {useHttpClient} from "../../shared/hooks/http-hook";
import {useContext, useEffect, useState} from "react";
import {useForm} from "../../shared/hooks/form-hooks";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import moment from "moment";
import PermissionProvider from "../../shared/permissions/providers/permission-provider";
import Restricted from "../../shared/permissions/Restricted";

const EditMoviePage = ()=>{
    let history = useHistory();
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedMovie, setLoadedMovie] = useState();
    const _id = useParams()._id;

    const [formState, inputHandler, setFormData] = useForm({
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


    const movieUpdateSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            await sendRequest( `${process.env.REACT_APP_BACKEND_URL}/movies/${_id}`, 'PUT', JSON.stringify({
                name: formState.inputs.name.value,
                genres: formState.inputs.genres.value,
                image: formState.inputs.image_url.value,
                premiered: formState.inputs.premiered.value,
            }), {'Content-Type': 'application/json', "Authorization": `Bearer ${auth.token}`})
            history.push('/movies');
        } catch (err) {}
    };

    const handleCancel = () => {
        history.push("/movies");
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
            <PermissionProvider permissions={auth.permissions}>
                <Restricted to="Update Movies">
            <Card className="card-form">
                <form className="movie-form" onSubmit={movieUpdateSubmitHandler}>
                    <Input id="name"
                           element="input"
                           type="text"
                           label="Name"
                           validators={[VALIDATOR_REQUIRE()]}
                           errorTest="Please enter a valid Name"
                           onInput={inputHandler}
                           initialValue={loadedMovie.name}
                           initialValid={true}/>
                    <Input id="genres"
                           element="input"
                           type="text"
                           label="Genres"
                           validators={[VALIDATOR_MINLENGTH(3)]}
                           errorTest="Please enter a valid Genres"
                           onInput={inputHandler}
                           initialValue={loadedMovie.genres}
                           initialValid={true}/>
                    <Input  id="image_url"
                            element="input"
                            type="text"
                            label="Image url"
                            validators={[VALIDATOR_MINLENGTH(3)]}
                            errorTest="Please enter a valid Image url"
                            onInput={inputHandler}
                            initialValue={loadedMovie.image}
                            initialValid={true}/>
                    <Input id="premiered" element="input"
                           type="date" label="Premiered"
                           validators={[VALIDATOR_REQUIRE()]}
                           errorTest="Please enter a valid Premiered"
                           onInput={inputHandler}
                           initialValue={(moment(loadedMovie.premiered).format("YYYY-MM-DD"))}
                           initialValid={true}/>
                    <Button type="Submit" disabled={!formState.isValid}>UPDATE</Button>
                    <Button onClick={handleCancel} inverse>CANCEL</Button>
                </form></Card></Restricted></PermissionProvider>}
        </>
    )
}


export default EditMoviePage;
