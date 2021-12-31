import axios from "axios";
import { Component } from "react";
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import { productDeletedAction } from "../../../Redux/ProductsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import PleaseWait from "../../SharedArea/PleaseWait/PleaseWait";
import "./ProductDetails.css";

// interface containing the route parameters.
// The exact route params in the Routing must be here as string variables:
interface RouteParams {
    id: string;
}

// Our props interface must extends the following:
interface ProductDetailsProps extends RouteComponentProps<RouteParams> { }

// Our state:
interface ProductDetailsState {
    product: ProductModel;
}

class ProductDetails extends Component<ProductDetailsProps, ProductDetailsState> {

    public constructor(props: ProductDetailsProps) {
        super(props);
        this.state = { product: null };
    }

    public async componentDidMount() {
        try {
            const id = +this.props.match.params.id;
            const product = store.getState().productsState.products.find(p => p.id === id);
            if (product) {
                this.setState({ product });
            }
            else {
                const response = await axios.get<ProductModel>(globals.productsUrl + this.props.match.params.id);
                this.setState({ product: response.data });
            }
        }
        catch (err) {
            alert("Error");
            console.log(err);
        }
    }

    private deleteProduct = async () => {
        try {
            const ok = window.confirm("Are you sure?");
            if (!ok) return;
            await axios.delete(globals.productsUrl + this.state.product.id);
            store.dispatch(productDeletedAction(this.state.product.id));
            alert("Product has been deleted!");
            this.props.history.push("/products");
        }
        catch (err) {
            alert("Error: " + err);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="ProductDetails">

                <h2>Product Details</h2>

                { this.state.product === null && <PleaseWait />}

                {this.state.product &&
                    <>
                        <h3>{this.state.product.name}</h3>
                        <h3>Price: ${this.state.product.price}</h3>
                        <h3>Stock: {this.state.product.stock}</h3>
                        <img src={globals.productsUrl + "images/" + this.state.product.imageName} />
                    </>
                }

                <br /><br />
                <NavLink to="/products">Back</NavLink>
                <span> | </span>
                <a href="#" onClick={this.deleteProduct}>Delete</a>

            </div>
        );
    }
}

export default ProductDetails;
