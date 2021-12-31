import {createContext} from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    name: null,
    permissions: null,
    isAdmin: null,
    expirationDate: undefined,
    login: () => {},
    logout: () => {}});
