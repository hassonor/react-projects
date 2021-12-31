import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<nav>
                <NavLink to="/home" exact>Home</NavLink>
                <NavLink to="/products" exact>Products</NavLink>
                <NavLink to="/about" exact>About</NavLink>
                <NavLink to="/contact-us" exact>Contact Us</NavLink>
            </nav>
        </div>
    );
}

export default Menu;
