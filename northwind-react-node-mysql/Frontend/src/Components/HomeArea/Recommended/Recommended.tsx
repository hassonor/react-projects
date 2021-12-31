import { Component, SyntheticEvent } from "react";
import "./Recommended.css";

// function Recommended(): JSX.Element {

//     const item = "Red Wine"; // Demo for getting it from a remote server...

//     function showRecommendation(args: SyntheticEvent): void {
//         console.log(args.target); // The element raising the event
//         console.log(args.nativeEvent); // The HTML native event object
//         console.log((args.target as HTMLButtonElement).innerHTML); // Converting target to a button for getting the innerHTML
//         alert(item);
//     }

//     return (
//         <div className="Recommended Box">
// 			<button onClick={showRecommendation}>Recommend a Product</button>
//         </div>
//     );
// }


class Recommended extends Component {

    private item = "Red Wine"; // Demo for getting it from a remote server...

    private showRecommendation = (args: SyntheticEvent) => {
        console.log(args.target); // The element raising the event
        console.log(args.nativeEvent); // The HTML native event object
        console.log((args.target as HTMLButtonElement).innerHTML); // Converting target to a button for getting the innerHTML
        alert(this.item);
    }

    public render(): JSX.Element {
        return (
            <div className="Recommended Box">
                <button onClick={this.showRecommendation}>Recommend a Product</button>
            </div>
        );
    }
}

export default Recommended;
