const Scroll = (props) => {
  return (
    <div
      style={{
        overflowY: "scroll",
        border: "4px solid black",
        height: "800px",
      }}
    >
      {props.children}
    </div>
  );
};

export default Scroll;
