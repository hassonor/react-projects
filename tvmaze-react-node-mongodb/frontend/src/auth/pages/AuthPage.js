import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import {VALIDATOR_MINLENGTH} from "../../shared/util/validators";
import {useForm} from "../../shared/hooks/form-hooks";
import Button from "../../shared/components/FormElements/Button";
import {useContext, useState} from "react";
import {AuthContext} from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import axios from "axios";


const AuthPage = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const [formState, inputHandler, setFormData] = useForm({
        username: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: ''
        }
    }, false)

    const switchModeHandler = () => {
        setFormData({
            ...formState.inputs,
        }, formState.inputs.username.isValid && formState.inputs.password.isValid);
        setIsLoginMode((prevMode) => !prevMode)
    }

    const authSubmitHandler = async e => {
        e.preventDefault();
        if (isLoginMode) {
            try {
                setIsLoading(true);
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
                    username: formState.inputs.username.value,
                    password: formState.inputs.password.value,
                });
                if(response.status !== 200){
                    throw new Error(response.data);
                }

                setIsLoading(false);
                auth.login(response.data.token, response.data.isAdmin,response.data.name,response.data.permissions);
            } catch (error) {
                setIsLoading(false);
                setError(error.response.data || 'Something went wrong, please try again.');
            }
        } else {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
                    username: formState.inputs.username.value,
                    password: formState.inputs.password.value,
                });

                if(response.status !== 200){
                    throw new Error(response.data);
                }

                setIsLoading(false);
                switchModeHandler()
            } catch (error) {
                setIsLoading(false);
                setError(error.response.data || 'Something went wrong, please try again.');
            }
        }

    }

    const errorHandler = () =>{
        setError(null);
    }

    return (
        <>
            <ErrorModal error={error} onClear={errorHandler}/>
            <Card className="authentication card-form">
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>  {isLoginMode ? 'Login' : 'Sign Up'} Required</h2>
                <hr/>
                <form onSubmit={authSubmitHandler}>
                    <Input element="input"
                           id="username"
                           type="text"
                           label="Username"
                           validators={[VALIDATOR_MINLENGTH(3)]}
                           errorText="Please enter a valid username (at least 3 characters)"
                           onInput={inputHandler}
                    />
                    {/*{!isLoginMode && (<ImageUpload center id="image" onInput={inputHandler()}/>)}*/}
                    <Input element="input"
                           id="password"
                           type="password"
                           label="Password"
                           validators={[VALIDATOR_MINLENGTH(6)]}
                           errorText="Please enter a valid password (at least 6 characters)"
                           onInput={inputHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        {isLoginMode ? 'LOGIN' : 'CREATE'}
                    </Button>
                </form>
                <br/>
                <Button inverse onClick={switchModeHandler}>SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}</Button>
            </Card>
        </>
    )

}

export default AuthPage;

