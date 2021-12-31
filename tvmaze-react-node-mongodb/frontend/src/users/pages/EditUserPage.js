import {useParams} from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import {useHistory} from "react-router-dom";
import {useForm} from "../../shared/hooks/form-hooks";
import {useContext, useEffect, useState} from "react";
import Card from "../../shared/components/UIElements/Card";
import {useHttpClient} from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {AuthContext} from "../../shared/context/auth-context";


const EditUserPage = (props) => {
    let history = useHistory();
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedUser, setLoadedUser] = useState();
    const [viewSubsChecked, setViewSubsChecked] = useState(undefined);
    const [createSubsChecked, setCreateSubsChecked] = useState(undefined);
    const [updateSubsChecked, setUpdateSubsChecked] = useState(undefined);
    const [deleteSubsChecked, setDeleteSubsChecked] = useState(undefined);
    const [viewMoviesChecked, setViewMoviesChecked] = useState(undefined);
    const [createMoviesChecked, setCreateMoviesChecked] = useState(undefined);
    const [updateMoviesChecked, setUpdateMoviesChecked] = useState(undefined);
    const [deleteMoviesChecked, setDeleteMoviesChecked] = useState(undefined);
    const _id = useParams()._id;

    const [formState, inputHandler, setFormData] = useForm({
        firstName: {
            value: '',
            isValid: false
        },
        lastName: {
            value: '',
            isValid: false
        },
        userName: {
            value: '',
            isValid: false
        },
        sessionTimeOut: {
            value: '',
            isValid: false
        }
    }, false)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/users/${_id}`
                );
                setLoadedUser(responseData);
                setViewSubsChecked(responseData.permissions.includes("View Subscriptions"))
                setCreateSubsChecked(responseData.permissions.includes("Create Subscriptions"))
                setUpdateSubsChecked(responseData.permissions.includes("Update Subscriptions"))
                setDeleteSubsChecked(responseData.permissions.includes("Delete Subscriptions"))
                setViewMoviesChecked(responseData.permissions.includes("View Movies"))
                setCreateMoviesChecked(responseData.permissions.includes("Create Movies"))
                setUpdateMoviesChecked(responseData.permissions.includes("Update Movies"))
                setDeleteMoviesChecked(responseData.permissions.includes("Delete Movies"))

                setFormData({
                    firstName: {
                        value: responseData.firstName,
                        isValid: true
                    },
                    lastName: {
                        value: responseData.lastName,
                        isValid: true
                    },
                    username: {
                        value: responseData.username,
                        isValid: true
                    },
                    sessionTimeOut: {
                        value: responseData.sessionTimeOut,
                        isValid: true
                    }
                }, true)

            } catch (err) {}
        };
        fetchUser();
    }, [sendRequest, _id, setFormData]);


    const userUpdateSubmitHandler = async event => {
        event.preventDefault();
        const permissionsForUpdate = setFinalPermission();
        try {
            await sendRequest( `${process.env.REACT_APP_BACKEND_URL}/users/${_id}`, 'PUT', JSON.stringify({
                firstName: formState.inputs.firstName.value,
                lastName: formState.inputs.lastName.value,
                username: formState.inputs.username.value,
                sessionTimeOut: formState.inputs.sessionTimeOut.value,
                permissions: permissionsForUpdate
            }), {'Content-Type': 'application/json', "Authorization": `Bearer ${auth.token}`})
            history.push("/users")
        } catch (err) {}
    };

    const setFinalPermission = () =>{
        let newArrayOfPermissions = [];
        if(viewSubsChecked)
            newArrayOfPermissions.push("View Subscriptions");
        if(createSubsChecked)
            newArrayOfPermissions.push("Create Subscriptions");
        if(updateSubsChecked)
            newArrayOfPermissions.push("Update Subscriptions");
        if(deleteSubsChecked)
            newArrayOfPermissions.push("Delete Subscriptions");
        if(viewMoviesChecked)
            newArrayOfPermissions.push("View Movies");
        if(createMoviesChecked)
            newArrayOfPermissions.push("Create Movies");
        if(updateMoviesChecked)
            newArrayOfPermissions.push("Update Movies");
        if(deleteMoviesChecked)
            newArrayOfPermissions.push("Delete Movies");

        return newArrayOfPermissions;
    }

    const handleCancel = () => {
        history.push("/users");
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

    if (!loadedUser && !error) {
        return (
            <div className="center">
                <h2>Could not find user!</h2>
            </div>
        )
    }

    const handleChangeViewSubsChecked = (e) =>{
            setViewSubsChecked(e.target.checked);
    }
    const handleChangeCreateSubsChecked = (e) =>{
        if(!viewSubsChecked && e.target.checked )
            setViewSubsChecked(true);
        setCreateSubsChecked(e.target.checked);
    }
    const handleChangeDeleteSubsChecked = (e) =>{
        if(!viewSubsChecked && e.target.checked )
            setViewSubsChecked(true);
        setDeleteSubsChecked(e.target.checked);
    }
    const handleChangeUpdateSubsChecked = (e) =>{
        if(!viewSubsChecked && e.target.checked )
            setViewSubsChecked(true);
        setUpdateSubsChecked(e.target.checked);
    }
    const handleChangeViewMoviesChecked = (e) =>{
        setViewMoviesChecked(e.target.checked);
    }
    const handleChangeCreateMoviesChecked = (e) =>{
        if(!viewMoviesChecked && e.target.checked )
            setViewMoviesChecked(true);
        setCreateMoviesChecked(e.target.checked);
    }
    const handleChangeDeleteMoviesChecked = (e) =>{
        if(!viewMoviesChecked && e.target.checked )
            setViewMoviesChecked(true);
        setDeleteMoviesChecked(e.target.checked);
    }
    const handleChangeUpdateMoviesChecked = (e) =>{
        if(!viewMoviesChecked && e.target.checked )
            setViewMoviesChecked(true);
        setUpdateMoviesChecked(e.target.checked);
    }



    return (
        <>
            <ErrorModal error={error} onClear={clearError}/>
            {!isLoading && loadedUser &&
            <Card className="card-form">
            <form className="movie-form" onSubmit={userUpdateSubmitHandler}>
                <Input id="firstName" element="input" type="text"
                       label="firstName"
                       validators={[VALIDATOR_MINLENGTH(2)]}
                       errorTest="Please enter a valid firstName"
                       onInput={inputHandler}
                       initialValue={loadedUser.firstName || undefined}
                       initialValid={true}/>
                <Input id="lastName" element="input" type="text"
                       label="lastName"
                       validators={[VALIDATOR_MINLENGTH(2)]}
                       errorTest="Please enter a valid lastName"
                       onInput={inputHandler}
                       initialValue={loadedUser.lastName || undefined}
                       initialValid={true}/>
                <Input id="username" element="input"
                       type="text" label="userName"
                       validators={[VALIDATOR_MINLENGTH(2)]}
                       errorTest="Please enter a valid userName"
                       onInput={inputHandler}
                       initialValue={loadedUser.username || undefined}
                       initialValid={true}/>
                <Input id="sessionTimeOut" element="input"
                       type="number" label="sessionTimeOut"
                       validators={[VALIDATOR_REQUIRE()]}
                       errorTest="Please enter a valid sessionTimeOut"
                       onInput={inputHandler}
                       initialValue={loadedUser.sessionTimeOut || undefined}
                       initialValid={true}/>
                <input type="text"
                       value={` Created Date: ${loadedUser.createdData || undefined}`}
                       disabled/>
                <br/><br/>
                <span><b>Permissions:</b></span><br/>
                <input type="checkbox"
                       id="view_subs"
                       name="view_subs"
                       value="View Subscriptions"
                       checked={viewSubsChecked || false}
                       onChange={handleChangeViewSubsChecked}
                       disabled={createSubsChecked || deleteSubsChecked || updateSubsChecked}
             />
                    <label htmlFor="view_subs">View Subscriptions</label><br/>
                <input type="checkbox"
                       id="create_subs"
                       name="create_subs"
                       value="Create Subscriptions"
                       onChange={handleChangeCreateSubsChecked}
                       checked={createSubsChecked || false} />
                <label htmlFor="create_subs">Create Subscriptions</label><br/>
                <input type="checkbox"
                       id="delete_subs"
                       name="delete_subs"
                       value="Delete Subscriptions"
                       onChange={handleChangeDeleteSubsChecked}
                       checked={deleteSubsChecked || false}/>
                <label htmlFor="delete_subs">Delete Subscriptions</label><br/>
                <input type="checkbox"
                       id="update_subs"
                       name="edit_subs"
                       value="Update Subscriptions"
                       onChange={handleChangeUpdateSubsChecked}
                       checked={updateSubsChecked || false}/>
                <label htmlFor="update_subs">Update Subscriptions</label><br/>
                <input type="checkbox"
                       id="view_movies"
                       name="view_movies"
                       value="View Movies"
                       disabled={createMoviesChecked || deleteMoviesChecked || updateMoviesChecked}
                       onChange={handleChangeViewMoviesChecked}
                       checked={viewMoviesChecked || false}/>
                <label htmlFor="view_movies">View Movies</label><br/>
                <input type="checkbox"
                       id="create_movies"
                       name="create_movies"
                       value="Create Movies"
                       onChange={handleChangeCreateMoviesChecked}
                       checked={createMoviesChecked || false}/>
                <label htmlFor="create_movies">Create Movies</label><br/>
                <input type="checkbox"
                       id="delete_movies"
                       name="delete_movies"
                       value="Delete Movies"
                       onChange={handleChangeDeleteMoviesChecked}
                       checked={deleteMoviesChecked || false}/>
                <label htmlFor="delete_movies">Delete Movies</label><br/>
                <input type="checkbox"
                       id="update_movies"
                       name="update_movies"
                       value="Update Movies"
                       onChange={handleChangeUpdateMoviesChecked}
                       checked={updateMoviesChecked || false }/>
                <label htmlFor="update_movies">Update Movies</label><br/><br/>
                <Button type="Submit" disabled={!formState.isValid}>UPDATE</Button>
                <Button onClick={handleCancel} inverse>CANCEL</Button>
            </form></Card>}
        </>
    )
}

export default EditUserPage;





