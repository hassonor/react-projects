import "./Register.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import globals from "../../../Services/Globals";
import store from "../../../Redux/Store";
import { userRegisteredAction } from "../../../Redux/AuthState";
import UserModel from "../../../Models/UserModel";
import notify from "../../../Services/Notify";
import { useHistory } from "react-router";

function Register(): JSX.Element {

    const history = useHistory();
    const { register, handleSubmit, formState } = useForm<UserModel>();

    // Submit:
    async function submit(user: UserModel) {
        try {
            const response = await axios.post<UserModel>(globals.registerUrl, user);
            store.dispatch(userRegisteredAction(response.data));
            notify.success("You have been successfully registered.");
            history.push("/home");
        }
        catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="Register Box">

            <h2>Register</h2>

            <form onSubmit={handleSubmit(submit)}>

                <label>First Name:</label>
                <input type="text" autoFocus {...register("firstName", {
                    required: { value: true, message: "Missing first name." },
                    minLength: { value: 2, message: "First name too short." }
                })} />
                <span>{formState.errors.firstName?.message}</span>

                <label>Last Name:</label>
                <input type="text" {...register("lastName", {
                    required: { value: true, message: "Missing last name." },
                    minLength: { value: 2, message: "Last name too short." }
                })} />
                <span>{formState.errors.lastName?.message}</span>

                <label>Username:</label>
                <input type="text" {...register("username", {
                    required: { value: true, message: "Missing username." },
                    minLength: { value: 4, message: "Username too short." }
                })} />
                <span>{formState.errors.username?.message}</span>

                <label>Password:</label>
                <input type="password" {...register("password", {
                    required: { value: true, message: "Missing password." },
                    minLength: { value: 4, message: "password too short." }
                })} />
                <span>{formState.errors.password?.message}</span>

                <button>Register</button>

            </form>
        </div>
    );
}

export default Register;