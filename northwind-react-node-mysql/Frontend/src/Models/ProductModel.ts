class ProductModel {

    public id: number;
    public name: string;
    public price: number;
    public stock: number;
    public imageName: string;
    public image: FileList;

    public static convertToFormData(product: ProductModel): FormData {
        const myFormData = new FormData();
        myFormData.append("name", product.name);
        myFormData.append("price", product.price.toString());
        myFormData.append("stock", product.stock.toString());
        myFormData.append("image", product.image.item(0));
        return myFormData;
    }

}

export default ProductModel;