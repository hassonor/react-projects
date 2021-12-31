import { useHistory } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/util/validators";
import {useForm} from "../../shared/hooks/form-hooks";
import Card from "../../shared/components/UIElements/Card";
import {useHttpClient} from "../../shared/hooks/http-hook";
import {AuthContext} from "../../shared/context/auth-context";
import {useContext, useState} from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const NewUserPage = (props) => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const [viewSubsChecked, setViewSubsChecked] = useState(false);
    const [createSubsChecked, setCreateSubsChecked] = useState(false);
    const [updateSubsChecked, setUpdateSubsChecked] = useState(false);
    const [deleteSubsChecked, setDeleteSubsChecked] = useState(false);
    const [viewMoviesChecked, setViewMoviesChecked] = useState(false);
    const [createMoviesChecked, setCreateMoviesChecked] = useState(false);
    const [updateMoviesChecked, setUpdateMoviesChecked] = useState(false);
    const [deleteMoviesChecked, setDeleteMoviesChecked] = useState(false);

     const [formState, inputHandler] = useForm({
         firstName:{
             value: '',
             isValid: false
         },
         lastName:{
             value: '',
             isValid: false
         },
         UserName:{
             value: '',
             isValid: false
         },
         sessionTimeOut:{
             value: 60,
             isValid: false
         }
     },false)

    const handleCancel = () => {
        history.push('/users')
    }


    const userSubmitHandler =  async(e) =>{
        e.preventDefault();
        const permissionsForUpdate = setFinalPermission();
        try{
            console.log(auth.token);
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users`, 'POST',JSON.stringify({
                username: formState.inputs.UserName.value,
                firstName: formState.inputs.firstName.value,
                lastName: formState.inputs.lastName.value,
                sessionTimeOut: formState.inputs.sessionTimeOut.value,
                permissions: permissionsForUpdate,
            }),{'Content-Type': 'application/json', "Authorization": `Bearer ${auth.token}`})

            history.push('/users')
        }
        catch(err){}
    }

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
            <ul className="user-list">
                <button style={{height:"40px",width:"150px"}} onClick={()=>history.push('/users')}>All Users</button> &nbsp;&nbsp;
                <button style={{height:"40px",width:"150px" ,backgroundColor: "yellow"}}>Add User</button>
            </ul>
            <ErrorModal error={error} onClear={clearError}/>
        <Card className="card-form">
        <form  onSubmit={userSubmitHandler}>
            {isLoading && <LoadingSpinner asOverlay />}
        <Input id="firstName" element="input" type="text" label="firstName" validators={[VALIDATOR_MINLENGTH(2)]}
               errorTest="Please enter a valid firstName" onInput={inputHandler}/>
        <Input id="lastName" element="input" type="text" label="lastName" validators={[VALIDATOR_MINLENGTH(2)]}
               errorTest="Please enter a valid lastName" onInput={inputHandler} />
        <Input  id="UserName" element="input" type="text" label="UserName" validators={[VALIDATOR_MINLENGTH(2)]}
                errorTest="Please enter a valid UserName" onInput={inputHandler} />
        <Input id="sessionTimeOut" element="input" type="number" label="sessionTimeOut" min="0" validators={[VALIDATOR_REQUIRE()]}
               errorTest="Please enter a valid sessionTimeOut"  onInput={inputHandler}  />

            <span><b>Permissions:</b></span><br/>
            <input type="checkbox"
                   id="view_subs"
                   name="view_subs"
                   value="View Subscriptions"
                   checked={viewSubsChecked}
                   onChange={handleChangeViewSubsChecked}
                   disabled={createSubsChecked || deleteSubsChecked || updateSubsChecked}
            />
            <label htmlFor="view_subs">View Subscriptions</label><br/>
            <input type="checkbox"
                   id="create_subs"
                   name="create_subs"
                   value="Create Subscriptions"
                   onChange={handleChangeCreateSubsChecked}
                   checked={createSubsChecked} />
            <label htmlFor="create_subs">Create Subscriptions</label><br/>
            <input type="checkbox"
                   id="delete_subs"
                   name="delete_subs"
                   value="Delete Subscriptions"
                   onChange={handleChangeDeleteSubsChecked}
                   checked={deleteSubsChecked}/>
            <label htmlFor="delete_subs">Delete Subscriptions</label><br/>
            <input type="checkbox"
                   id="update_subs"
                   name="edit_subs"
                   value="Update Subscriptions"
                   onChange={handleChangeUpdateSubsChecked}
                   checked={updateSubsChecked}/>
            <label htmlFor="update_subs">Update Subscriptions</label><br/>
            <input type="checkbox"
                   id="view_movies"
                   name="view_movies"
                   value="View Movies"
                   disabled={createMoviesChecked || deleteMoviesChecked || updateMoviesChecked}
                   onChange={handleChangeViewMoviesChecked}
                   checked={viewMoviesChecked}/>
            <label htmlFor="view_movies">View Movies</label><br/>
            <input type="checkbox"
                   id="create_movies"
                   name="create_movies"
                   value="Create Movies"
                   onChange={handleChangeCreateMoviesChecked}
                   checked={createMoviesChecked}/>
            <label htmlFor="create_movies">Create Movies</label><br/>
            <input type="checkbox"
                   id="delete_movies"
                   name="delete_movies"
                   value="Delete Movies"
                   onChange={handleChangeDeleteMoviesChecked}
                   checked={deleteMoviesChecked}/>
            <label htmlFor="delete_movies">Delete Movies</label><br/>
            <input type="checkbox"
                   id="update_movies"
                   name="update_movies"
                   value="Update Movies"
                   onChange={handleChangeUpdateMoviesChecked}
                   checked={updateMoviesChecked}/>
            <label htmlFor="update_movies">Update Movies</label><br/><br/>
            <Button type="Submit" disabled={!formState.isValid}>ADD</Button>
            <Button onClick={handleCancel} inverse>CANCEL</Button>
        </form></Card>
        </>
    )
}


export default NewUserPage;
