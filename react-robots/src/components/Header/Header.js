import React from "react";
import CounterButton from "../CounterButton/CounterButton";

//Functional Component
const Header = React.memo((props) => {
  return (
    <>
      <h1 className="f1">Robots React</h1>
      <CounterButton />
    </>
  );
});

export default Header;
