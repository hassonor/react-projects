import "./Discount.css";

function Discount(): JSX.Element {

    const percent = 10;

    return (
        <div className="Discount Box">

            {/* Interpolation */}
			<p>Only now, {percent}% discount on all products!</p>
            
        </div>
    );
}

export default Discount;
