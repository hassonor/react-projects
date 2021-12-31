import { Component } from "react";
import "./Bestseller.css";

interface BestsellerState {
    item: string;
    price: number;
}

// class Bestseller extends Component { // no props and no state
// class Bestseller extends Component<SomePropsType> { // we have props (SomePropsType), and no state
// class Bestseller extends Component<SomePropsType, SomeStateType> { // we have props (SomePropsType) and state (SomeStateType)
// class Bestseller extends Component<{}, SomeStateType> { // no props, but we have state (SomeStateType)
class Bestseller extends Component<{}, BestsellerState> {

    public constructor(props: {}) {
        super(props);
        this.state = { item: "", price: 0 }; // Init the state.
    }

    private showBestseller = () => {
        this.setState({ item: "Irish Coffee", price: 9.5 });
    }

    public render(): JSX.Element {
        return (
            <div className="Bestseller Box">
                <button onClick={this.showBestseller}>Show Bestseller Product</button>
                <span>{this.state.item}, price: ${this.state.price}</span>
            </div>
        );
    }
}

export default Bestseller;
