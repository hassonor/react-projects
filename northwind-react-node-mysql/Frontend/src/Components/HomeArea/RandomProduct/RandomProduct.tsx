import { Component } from "react";
import "./RandomProduct.css";

interface RandomProductState {
    products: string[];
    randomProduct: string;
}

class RandomProduct extends Component<{}, RandomProductState> {

    private timerId = 0;

    // Constructor - Object has been created
    public constructor(props: {}) {
        super(props);
        this.state = {
            products: ["Apple", "Banana", "Peach", "Grapes", "Orange"],
            randomProduct: "Apple"
        };
    }

    // componentDidMount - Object is ready for use:
    public componentDidMount(): void {
        this.timerId = window.setInterval(() => {
            const index = Math.floor(Math.random() * this.state.products.length);
            this.setState({ randomProduct: this.state.products[index] });
        }, 1000);
    }

    // render - UI needs to be rendered into the DOM:
    public render(): JSX.Element {
        return (
            <div className="RandomProduct Box">
                <p>
                    <span>{this.state.randomProduct}</span>
                </p>
            </div>
        );
    }

    // componentDidUpdate - Component state or props has been changed
    public componentDidUpdate(): void {

    }

    // componentWillUnmount - the component is about to be destroyed!
    public componentWillUnmount(): void {
        clearInterval(this.timerId);
    }
}

export default RandomProduct;
