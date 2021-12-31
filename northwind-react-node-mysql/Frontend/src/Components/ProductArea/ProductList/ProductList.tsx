import { Add } from "@material-ui/icons";
import axios from "axios";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import { productsDownloadedAction } from "../../../Redux/ProductsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import PleaseWait from "../../SharedArea/PleaseWait/PleaseWait";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

interface ProductListState {
    products: ProductModel[];
}

class ProductList extends Component<{}, ProductListState> {

    public constructor(props: {}) {
        super(props);
        this.state = { products: store.getState().productsState.products };
    }

    public async componentDidMount() {
        try {
            if (this.state.products.length === 0) {
                const response = await axios.get<ProductModel[]>(globals.productsUrl); // response is a wrapper.
                this.setState({ products: response.data });
                store.dispatch(productsDownloadedAction(response.data));
            }
        }
        catch (err) {
            alert("Error");
            console.log(err);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="ProductList">

                { this.state.products.length === 0 && <PleaseWait />}

                <NavLink className="NewProduct" to="/products/new" exact>
                    <Add />
                </NavLink>

                {this.state.products.map(p => <ProductCard product={p} key={p.id} />)}
            </div>
        );
    }
}

export default ProductList;
