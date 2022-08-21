import { storage } from "services/storage"

export const initializeOnRefresh = (key, returnedType) => {
    const dataFromStorage = storage.load(key) ?? returnedType;

    return dataFromStorage;
}