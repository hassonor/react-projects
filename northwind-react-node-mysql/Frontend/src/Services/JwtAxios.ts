// Axios with Interceptor for JWT

import axios from "axios";
import store from "../Redux/Store";

// creating axios instance:
const jwtAxios = axios.create();

// Adding a request interceptor to it:
jwtAxios.interceptors.request.use(request => {

    // If user logged in:
    if (store.getState().authState.user) {

        // Add the token to request headers:
        request.headers = {
            "authorization": "Bearer " + store.getState().authState.user.token
        };
    }
    
    return request;
});

export default jwtAxios;