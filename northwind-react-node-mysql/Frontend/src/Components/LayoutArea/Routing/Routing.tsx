import { Redirect, Route, Switch } from "react-router-dom";
import About from "../../AboutArea/About/About";
import Home from "../../HomeArea/Home/Home";
import ProductList from "../../ProductArea/ProductList/ProductList";
import Page404 from "../../SharedArea/Page404/Page404";
import Loadable from "react-loadable";
import PleaseWait from "../../SharedArea/PleaseWait/PleaseWait";
import ProductDetails from "../../ProductArea/ProductDetails/ProductDetails";
import AddProduct from "../../ProductArea/AddProduct/AddProduct";
import Register from "../../AuthArea/Register/Register";

function Routing(): JSX.Element {
    return (
        <Switch>
            <Route path="/home" component={Home} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/products" component={ProductList} exact />
            <Route path="/products/details/:id" component={ProductDetails} exact />
            <Route path="/products/new" component={AddProduct} exact />
            <Route path="/about" component={About} exact />
            <Route path="/contact-us" component={Loadable({ loader: () => import("../../ContactUs/ContactUs"), loading: PleaseWait })} />
            <Redirect from="/" to="/home" exact />
            <Route component={Page404} /> {/* Must be last! */}
        </Switch>
    );
}

export default Routing;
