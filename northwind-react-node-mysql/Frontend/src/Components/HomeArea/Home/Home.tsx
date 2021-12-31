import Desserts from "../Desserts/Desserts";
import Discount from "../Discount/Discount";
import Recommended from "../Recommended/Recommended";
import Sales from "../Sales/Sales";
import Specials from "../Specials/Specials";
import Location from "../Location/Location";
import "./Home.css";
import Bestseller from "../Bestseller/Bestseller";
import React from "react";
import RandomProduct from "../RandomProduct/RandomProduct";
import Search from "../Search/Search";
import Address from "../Address/Address";
import Hours from "../Hours/Hours";
import Clock from "../Clock/Clock";
import HugeSeller from "../HugeSeller/HugeSeller";


function Home(): JSX.Element {
    return (
        <div className="Home">

            {/* Interpolation: */}
			<Discount />

            {/* Conditional Rendering: */}
            <Specials />

            {/* Displaying Lists: */}
            <Desserts />

            {/* Props: */}
            <Sales percent={10} category="Beverages" />
            <Sales percent={7} />

            {/* Events: */}
            <Recommended />
            <Location />

            {/* State: */}
            <Bestseller />
            <RandomProduct />

            {/* Two-Way Binding: */}
            <Search />

            {/* Dynamic Styling: */}
            <Address />

            {/* CSS Modules: */}
            <Hours />

            <Clock />

            {/* useState */}
            <HugeSeller />
            
        </div>
    );
}

export default Home;
