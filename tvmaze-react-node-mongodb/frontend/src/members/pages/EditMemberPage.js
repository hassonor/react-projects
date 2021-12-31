import {useHistory, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../shared/context/auth-context";
import {useHttpClient} from "../../shared/hooks/http-hook";
import {useForm} from "../../shared/hooks/form-hooks";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Input from "../../shared/components/FormElements/Input";
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import PermissionProvider from "../../shared/permissions/providers/permission-provider";
import Restricted from "../../shared/permissions/Restricted";


const EditMemberPage = props => {
    let history = useHistory();
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedMember, setLoadedMember] = useState();
    const _id = useParams()._id;

    const [formState, inputHandler, setFormData] = useForm({
        name: {
            value: '',
            isValid: false
        },
        Email: {
            value: '',
            isValid: false
        },
        city: {
            value: '',
            isValid: false
        }
    }, false);

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/members/${_id}`
                );
                setLoadedMember(responseData);

                setFormData({
                    name:{
                        value: responseData.name,
                        isValid: true
                    },
                    email:{
                        value: responseData.email,
                        isValid: true
                    },
                    city:{
                        value: responseData.city,
                        isValid: true
                    },
                }, true)

            } catch (err) {}
        };
        fetchMember();
    }, [sendRequest, _id, setFormData]);

    const memberUpdateSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            await sendRequest( `${process.env.REACT_APP_BACKEND_URL}/members/${_id}`, 'PUT', JSON.stringify({
                name: formState.inputs.name.value,
                email: formState.inputs.email.value,
                city: formState.inputs.city.value,
            }), {'Content-Type': 'application/json', "Authorization": `Bearer ${auth.token}`})
            history.push('/members');
        } catch (err) {}
    };

    const handleCancel = () => {
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

    if (!loadedMember && !error) {
        return (
            <div className="center">
                <h2>Could not find the Member!</h2>
            </div>
        )
    }
    return (<>
            <ErrorModal error={error} onClear={clearError}/>
            {!isLoading && loadedMember &&
            <PermissionProvider permissions={auth.permissions}>
                <Restricted to="Update Subscriptions">
            <Card className="card-form">
                <form className="member-form" onSubmit={memberUpdateSubmitHandler}>
                    <Input id="name"
                           element="input"
                           type="text"
                           label="Name"
                           validators={[VALIDATOR_MINLENGTH(2)]}
                           errorTest="Please enter a valid Name"
                           onInput={inputHandler}
                           initialValue={loadedMember.name}
                           initialValid={true}/>
                    <Input id="email"
                           element="input"
                           type="text"
                           label="Email"
                           validators={[VALIDATOR_EMAIL()]}
                           errorTest="Please enter a valid Email"
                           onInput={inputHandler}
                           initialValue={loadedMember.email}
                           initialValid={true}/>
                    <Input id="city" element="input"
                           type="text" label="City"
                           validators={[VALIDATOR_REQUIRE()]}
                           errorTest="Please enter a valid City"
                           onInput={inputHandler}
                           initialValue={loadedMember.city}
                           initialValid={true}/>
                    <Button type="Submit" disabled={!formState.isValid}>UPDATE</Button>
                    <Button onClick={handleCancel} inverse>CANCEL</Button>
                </form></Card>
                </Restricted>
            </PermissionProvider>
                }
        </>
    )
}


export default EditMemberPage;

