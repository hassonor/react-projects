import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/util/validators";
import {useForm} from "../../shared/hooks/form-hooks";
import Card from "../../shared/components/UIElements/Card";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../shared/context/auth-context";
import {useContext} from "react";
import {useHttpClient} from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Restricted from "../../shared/permissions/Restricted";
import PermissionProvider from "../../shared/permissions/providers/permission-provider";


const NewMoviePage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient()

    const [formState, inputHandler] = useForm({
        name: {
            value: '',
            isValid: false
        },
        email: {
            value: '',
            isValid: false
        },
        city: {
            value: '',
            isValid: false
        }
    }, false);

    const handleCancel = () => {
        history.push('/members')
    }

    const memberSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/members`, 'POST', JSON.stringify({
                name: formState.inputs.name.value,
                email: formState.inputs.email.value,
                city: formState.inputs.city.value,
            }), {'Content-Type': 'application/json', "Authorization": `Bearer ${auth.token}`})
            history.push('/members')
        } catch (err) {
        }
    }

    return (
        <>
            <ul className="member-list">
                <button style={{height: "40px", width: "150px"}} onClick={() => history.push('/members')}>All Members
                </button>
                &nbsp;&nbsp;
                <button style={{height: "40px", width: "150px", backgroundColor: "yellow"}}>Add Member</button>
            </ul>
            <PermissionProvider permissions={auth.permissions}>
                <Restricted to="Create Subscriptions">
                    <ErrorModal error={error} onClear={clearError}/>
                    <Card className="card-form">
                        <form onSubmit={memberSubmitHandler}>
                            {isLoading && <LoadingSpinner asOverlay/>}
                            <Input id="name" element="input" type="text" label="Name"
                                   validators={[VALIDATOR_MINLENGTH(2)]}
                                   errorTest="Please enter a valid Name" onInput={inputHandler}/>
                            <Input id="email"
                                   element="input"
                                   type="text"
                                   label="Email"
                                   validators={[VALIDATOR_EMAIL()]}
                                   errorTest="Please enter a valid Email"
                                   onInput={inputHandler}/>
                            <Input id="city" element="input"
                                   type="text" label="City"
                                   validators={[VALIDATOR_REQUIRE()]}
                                   errorTest="Please enter a valid City"
                                   onInput={inputHandler}/>
                            <Button type="Submit" disabled={!formState.isValid}>ADD</Button>
                            <Button onClick={handleCancel} danger>CANCEL</Button>
                        </form>
                    </Card>
                </Restricted>
            </PermissionProvider>
        </>)
}


export default NewMoviePage;
