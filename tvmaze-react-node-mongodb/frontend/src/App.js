import React, {Suspense} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import {AuthContext} from "./shared/context/auth-context";
import {useAuth} from "./shared/hooks/auth-hook";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";


const UsersPage = React.lazy(() => import('./users/pages/UsersPage'));
const EditUserPage = React.lazy(() => import('./users/pages/EditUserPage'));
const MoviesPage = React.lazy(() => import('./movies/pages/MoviesPage'));
const NewUserPage = React.lazy(() => import('./users/pages/NewUserPage'));
const NewMoviePage = React.lazy(() => import('./movies/pages/NewMoviePage'));
const EditMoviePage = React.lazy(() => import('./movies/pages/EditMoviePage'));
const MembersPage = React.lazy(() => import('./members/pages/MembersPage'));
const NewMemberPage = React.lazy(() => import('./members/pages/NewMemberPage'));
const EditMemberPage = React.lazy(() => import('./members/pages/EditMemberPage'));
const OneMemberPage = React.lazy(() => import('./members/pages/OneMemberPage'));
const OneMoviePage = React.lazy(() => import('./movies/pages/OneMoviePage'));
const AuthPage = React.lazy(() => import('./auth/pages/AuthPage'));

const App = () => {
    const {login, logout, token, isAdmin, name,permissions} = useAuth();
    let routes;
    if (token) {
        routes = (
            <Switch>
                    <Route path="/users" exact>
                        <UsersPage/>
                    </Route>
                    <Route path="/users/:_id" exact>
                        <EditUserPage/>
                    </Route>
                    <Route path="/add/user" exact>
                        <NewUserPage/>
                    </Route>
                    <Route path="/members" exact>
                        <MembersPage/>
                    </Route>
                    <Route path="/members/:_id" exact>
                        <EditMemberPage/>
                    </Route>
                    <Route path="/member/:_id" exact>
                        <OneMemberPage/>
                    </Route>
                    <Route path="/add/member" exact>
                        <NewMemberPage/>
                    </Route>
                        <Route path="/movies" exact>
                            <MoviesPage/>
                       </Route>
                    <Route path="/movies/:_id" exact>
                        <EditMoviePage/>
                    </Route>
                    <Route path="/movie/:_id" exact>
                        <OneMoviePage/>
                    </Route>
                    <Route path="/add/movie" exact>
                        <NewMoviePage/>
                    </Route>
                    <Redirect to="/movies"/>
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route path="/auth" exact>
                    <AuthPage/>
                </Route>
                <Redirect to="/auth"/>
            </Switch>
        )
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn: !!token, token: token,name: name,
            isAdmin: isAdmin,  permissions: permissions,login: login, logout: logout
        }}>
            <Router>
                <MainNavigation/>
                <main>
                    <Suspense fallback={<div className="center"><LoadingSpinner/></div>}>
                        {routes}
                    </Suspense>
                </main>
            </Router>
        </AuthContext.Provider>)
}

export default App;
