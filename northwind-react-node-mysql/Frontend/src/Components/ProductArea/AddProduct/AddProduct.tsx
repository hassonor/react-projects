import {useForm} from "react-hook-form";
import {useHistory} from "react-router";
import ProductModel from "../../../Models/ProductModel";
import {productAddedAction} from "../../../Redux/ProductsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/JwtAxios";
import notify from "../../../Services/Notify";
import "./AddProduct.css";

function AddProduct(): JSX.Element {

    const history = useHistory();
    const {register, handleSubmit, formState} = useForm<ProductModel>();

    // Block non-logged-in users:
    if (!store.getState().authState.user) {
        history.push("/login");
        return;
    }

    async function addProduct(product: ProductModel) {
        try {
            const response = await jwtAxios.post<ProductModel>(globals.productsUrl, ProductModel.convertToFormData(product));
            const addedProduct = response.data; // The added product in the backend.
            store.dispatch(productAddedAction(addedProduct));
            notify.success("Product has been added. ID: " + addedProduct.id);
            history.push("/products"); // Go to that route!
        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="AddProduct Box">

            <h2>Add new Product</h2>

            <form onSubmit={handleSubmit(addProduct)}>

                <label>Name: </label> <br/>
                <input type="text" autoFocus {...register("name", {required: true, minLength: 3})} />
                {formState.errors.name?.type === "required" && <span>Missing name.</span>}
                {formState.errors.name?.type === "minLength" && <span>Name too short.</span>}
                <br/><br/>

                <label>Price: </label> <br/>
                <input type="number" step="0.01" {...register("price", {required: true, min: 0})} />
                {formState.errors.price?.type === "required" && <span>Missing price.</span>}
                {formState.errors.price?.type === "min" && <span>Price can't be negative.</span>}
                <br/><br/>

                <label>Stock: </label> <br/>
                <input type="number" {...register("stock", {required: true, min: 0})} />
                {formState.errors.stock?.type === "required" && <span>Missing stock.</span>}
                {formState.errors.stock?.type === "min" && <span>Stock can't be negative.</span>}
                <br/><br/>

                <label>Image: </label> <br/>
                <input type="file" accept="image/*" {...register("image", {required: true})} />
                {formState.errors.image?.type === "required" && <span>Missing image.</span>}
                <br/><br/>

                <button>Add</button>

            </form>

        </div>
    );
}

export default AddProduct;
