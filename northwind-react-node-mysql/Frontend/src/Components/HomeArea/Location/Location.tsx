import { SyntheticEvent } from "react";
import "./Location.css";

function Location(): JSX.Element {

    function showLocation(args: SyntheticEvent): void {
        alert((args.target as HTMLSelectElement).value);
    }

    return (
        <div className="Location Box">
			<select onChange={showLocation}>
                <option>מחוז צפון</option>
                <option>מחוז מרכז</option>
                <option>מחוז ת"א</option>
                <option>מחוז דרום</option>
            </select>
        </div>
    );
}

export default Location;
