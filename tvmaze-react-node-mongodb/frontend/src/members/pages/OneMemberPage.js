import {useHistory, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useHttpClient} from "../../shared/hooks/http-hook";
import {useForm} from "../../shared/hooks/form-hooks";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Button from "../../shared/components/FormElements/Button";
import DisabledInput from "../../shared/components/FormElements/DisabledInput";


const OneMemberPage = props => {
    let history = useHistory();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedMember, setLoadedMember] = useState();
    const _id = useParams()._id;

    const [, inputHandler, setFormData] = useForm({
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


    const handleBack = () => {
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
            <Card className="card-form">
                    <DisabledInput id="name"
                           element="input"
                           type="text"
                           label="Name"
                           errorTest="Please enter a valid Name"
                           onInput={inputHandler}
                           initialValue={loadedMember.name}
                           initialValid={true}/>
                    <DisabledInput id="email"
                           element="input"
                           type="text"
                           label="Email"
                           errorTest="Please enter a valid Email"
                           onInput={inputHandler}
                           initialValue={loadedMember.email}
                           initialValid={true}/>
                    <DisabledInput id="city" element="input"
                           type="text" label="City"
                           onInput={inputHandler}
                           initialValue={loadedMember.city}
                           initialValid={true}/>
                    <Button onClick={handleBack} inverse>BACK</Button></Card>}
        </>
    )
}


export default OneMemberPage;

