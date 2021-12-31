import { Component } from "react";
import { Unsubscribe } from "redux";
import store from "../../../Redux/Store";
import "./TotalProducts.css";

interface TotalProductsState {
    totalProducts: number;
}

class TotalProducts extends Component<{}, TotalProductsState> {
    
    private unsubscribeMe: Unsubscribe; // פונקציה המיועדת להפסיק להאזין

    public constructor(props: {}) {
        super(props);
        this.state = { totalProducts: 0 };
    }

    public componentDidMount(): void {
        this.unsubscribeMe = store.subscribe(() => {
            this.setState({ totalProducts: store.getState().productsState.products.length });
        });
    }

    public componentWillUnmount(): void {
        this.unsubscribeMe(); // הפסק להאזין ברגע שהרכיב נהרס
    }

    public render(): JSX.Element {

        if(this.state.totalProducts === 0) {
            return null;
        }

        return (
            <div className="TotalProducts">
                <span>
                    We have {this.state.totalProducts} products.
                </span>
            </div>
        );
    }
}

export default TotalProducts;
