import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/util/validators";
import {useForm} from "../../shared/hooks/form-hooks";
import Card from "../../shared/components/UIElements/Card";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../shared/context/auth-context";
import {useContext} from "react";
import {useHttpClient} from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import PermissionProvider from "../../shared/permissions/providers/permission-provider";
import Restricted from "../../shared/permissions/Restricted";


const NewMoviePage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient()

    const [formState, inputHandler] = useForm({
        name: {
            value: '',
            isValid: false
        },
        genres: {
            value: '',
            isValid: false
        },
        image_url: {
            value: '',
            isValid: false
        },
        premiered: {
            value: Date.now(),
            isValid: false
        }
    }, false)

    const handleCancel = () => {
        history.push('/movies')
    }

    const movieSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            console.log(auth.token);
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/movies`, 'POST', JSON.stringify({
                name: formState.inputs.name.value,
                genres: formState.inputs.genres.value.split(","),
                image: formState.inputs.image_url.value,
                premiered: formState.inputs.premiered.value,
            }), {'Content-Type': 'application/json', "Authorization": `Bearer ${auth.token}`})
            history.push('/movies')
        } catch (err) {
        }
    }

    return (
        <>
            <ul className="movies-list">
                <button style={{height: "40px", width: "150px"}} onClick={() => history.push('/movies')}>All Movies
                </button>
                &nbsp;&nbsp;
                <button style={{height: "40px", width: "150px", backgroundColor: "yellow"}}>Add Movie</button>
            </ul>
            <PermissionProvider permissions={auth.permissions}>
                <Restricted to="Create Movies">
                    <ErrorModal error={error} onClear={clearError}/>
                    <Card className="card-form">
                        <form onSubmit={movieSubmitHandler}>
                            {isLoading && <LoadingSpinner asOverlay/>}
                            <Input id="name" element="input" type="text" label="Name"
                                   validators={[VALIDATOR_MINLENGTH(3)]}
                                   errorTest="Please enter a valid Name" onInput={inputHandler}/>
                            <Input id="genres" element="input" type="text" label="Genres"
                                   validators={[VALIDATOR_MINLENGTH(3)]}
                                   errorTest="Please enter a valid Genres" onInput={inputHandler}/>
                            <Input id="image_url" element="input" type="text" label="Image url"
                                   validators={[VALIDATOR_MINLENGTH(3)]}
                                   errorTest="Please enter a valid Image url" onInput={inputHandler}/>
                            <Input id="premiered" element="input" type="date" label="Premiered"
                                   validators={[VALIDATOR_REQUIRE()]}
                                   errorTest="Please enter a valid Premiered" onInput={inputHandler}/>
                            <Button type="Submit" disabled={!formState.isValid}>ADD</Button>
                            <Button onClick={handleCancel} danger>CANCEL</Button>
                        </form>
                    </Card>
                </Restricted>
            </PermissionProvider>
        </>)
}


export default NewMoviePage;
