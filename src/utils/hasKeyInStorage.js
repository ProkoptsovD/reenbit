import { storageKey } from "constants";

export const hasKeyInStorage = (key) => {
    try {
        const persistedStore = window.localStorage.getItem(storageKey.persistRootKeyInStorage) ?? {};
        const parsedStore = JSON.parse(persistedStore);
        const hasKey = key in parsedStore;

        return hasKey;

    } catch (error) {
        console.log(error);
    }
}