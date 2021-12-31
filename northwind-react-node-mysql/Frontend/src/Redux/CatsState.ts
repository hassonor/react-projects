export class CatModel {
    public id: number;
    public name: string;
    public age: number;
}

export class CatsState {
    public cats: CatModel[] = [];
}

export enum CatsActionType {
    CatsDownloaded = "CatsDownloaded",
    CatAdded = "CatAdded",
    CatUpdated = "CatUpdated",
    CatDeleted = "CatDeleted"
}

export interface CatsAction {
    type: CatsActionType;
    payload?: any;
}

export function CatsDownloadedAction(Cats: CatModel[]): CatsAction {
    return { type: CatsActionType.CatsDownloaded, payload: Cats };
}
export function CatAddedAction(addedCat: CatModel): CatsAction {
    return { type: CatsActionType.CatAdded, payload: addedCat };
}
export function CatUpdatedAction(updatedCat: CatModel): CatsAction {
    return { type: CatsActionType.CatUpdated, payload: updatedCat };
}
export function CatDeletedAction(id: number): CatsAction {
    return { type: CatsActionType.CatDeleted, payload: id };
}

export function catsReducer(currentState: CatsState = new CatsState(), action: CatsAction): CatsState {

    const newState = { ...currentState };

    switch (action.type) {

        case CatsActionType.CatsDownloaded:
            newState.cats = action.payload;
            break;

        case CatsActionType.CatAdded:
            newState.cats.push(action.payload);
            break;

        case CatsActionType.CatUpdated:
            const indexToUpdate = newState.cats.findIndex(c => c.id === action.payload.id);
            newState.cats[indexToUpdate] = action.payload;
            break;

        case CatsActionType.CatDeleted:
            const indexToDelete = newState.cats.findIndex(c => c.id === action.payload);
            newState.cats.splice(indexToDelete, 1);
            break;
    }

    return newState;
}