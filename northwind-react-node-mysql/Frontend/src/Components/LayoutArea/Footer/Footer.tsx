import TotalProducts from "../../ProductArea/TotalProducts/TotalProducts";
import "./Footer.css";

function Footer(): JSX.Element {
    return (
        <div className="Footer">
            <p>All Rights Reserved &copy;</p>
            <TotalProducts />
        </div>
    );
}

export default Footer;