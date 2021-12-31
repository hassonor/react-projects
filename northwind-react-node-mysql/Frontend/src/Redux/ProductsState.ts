import ProductModel from "../Models/ProductModel";

// Products State - המידע ברמת האפליקציה הקשור למוצרים
export class ProductsState {
    public products: ProductModel[] = []; // undefined חשוב לאתחל מערכים כך שלא יהיה בו
}

// Products Action Type: 
export enum ProductsActionType {
    ProductsDownloaded = "ProductsDownloaded",
    ProductAdded = "ProductAdded",
    ProductUpdated = "ProductUpdated",
    ProductDeleted = "ProductDeleted"
}

// Products Action:
export interface ProductsAction {
    type: ProductsActionType;
    payload?: any; // מטען שילוח
}

// Products Action Creators: 
export function productsDownloadedAction(products: ProductModel[]): ProductsAction {
    return { type: ProductsActionType.ProductsDownloaded, payload: products };
}
export function productAddedAction(addedProduct: ProductModel): ProductsAction {
    return { type: ProductsActionType.ProductAdded, payload: addedProduct };
}
export function productUpdatedAction(updatedProduct: ProductModel): ProductsAction {
    return { type: ProductsActionType.ProductUpdated, payload: updatedProduct };
}
export function productDeletedAction(id: number): ProductsAction {
    return { type: ProductsActionType.ProductDeleted, payload: id };
}

// Products Reducer: 
export function productsReducer(currentState: ProductsState = new ProductsState(), action: ProductsAction): ProductsState {

    const newState = { ...currentState };

    switch (action.type) {

        case ProductsActionType.ProductsDownloaded: // payload = all products
            newState.products = action.payload;
            break;

        case ProductsActionType.ProductAdded: // payload = added product
            newState.products.push(action.payload);
            break;

        case ProductsActionType.ProductUpdated: // payload = updated product
            const indexToUpdate = newState.products.findIndex(p => p.id === action.payload.id);
            newState.products[indexToUpdate] = action.payload;
            break;

        case ProductsActionType.ProductDeleted: // payload = product id to delete
            const indexToDelete = newState.products.findIndex(p => p.id === action.payload);
            newState.products.splice(indexToDelete, 1);
            break;
    }

    return newState;

}