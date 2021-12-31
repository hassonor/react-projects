import {NavLink, useLocation} from "react-router-dom";
import "./NavLinks.css";
import {AuthContext} from "../../context/auth-context";
import {useContext} from "react";

const NavLinks = () => {
    const auth = useContext(AuthContext);
    const { pathname } = useLocation();

    return <ul className="nav-links">
        {!auth.isLoggedIn &&<li>
            <NavLink to="/auth">Login</NavLink>
        </li>}
        {auth.isLoggedIn &&  <li>
            <NavLink to="/movies" isActive={() => ['/movies', '/add/movie'].includes(pathname)}>Movies</NavLink>
        </li>}
        {auth.isLoggedIn && auth.isAdmin && <li>
            <NavLink to="/users" isActive={() => ['/users', '/add/user'].includes(pathname)} >Users Management</NavLink>
        </li>}
        {auth.isLoggedIn && <li>
            <NavLink to="/members" isActive={() => ['/members', '/add/member'].includes(pathname)} >Subscribers</NavLink>
        </li>}
        {auth.isLoggedIn &&<li>
            <button onClick={auth.logout}>LOGOUT</button>
        </li>}

    </ul>
}



export default NavLinks;
