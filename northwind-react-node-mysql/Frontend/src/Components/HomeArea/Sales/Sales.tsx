import { Component } from "react";
import "./Sales.css";

// Creating props exact type:
interface SalesProps {
    percent: number;
    category?: string;
}

// // Functional Component:
// function Sales(props: SalesProps): JSX.Element {
//     return (
//         <div className="Sales Box">
// 			<p>Sale: {props.percent}% off on all {props.category || "Products"}!</p>
//         </div>
//     );
// }

// Class Component:
class Sales extends Component<SalesProps> {

    // If we have a ctor, we must get the props to our ctor and pass them to our super class:
    public constructor(props: SalesProps) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <div className="Sales Box">
                <p>Sale: {this.props.percent}% off on all {this.props.category || "Products"}!</p>
            </div>
        );
    }
}

export default Sales;
