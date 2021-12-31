import "./Address.css";

function Address(): JSX.Element {

    const dynamicStyling = {
        backgroundColor: Math.random() > 0.5 ? "red" : "Blue", // background-color --> backgroundColor
        color: Math.random() > 0.5 ? "green" : "yellow" // color --> color
    };

    return (
        <div className="Address Box">
            <p style={dynamicStyling}>Our Address: HaMasger 34, Tel Aviv</p>
        </div>
    );
}

export default Address;
