const save = (key, value) => {
    try {
        const serializedState = JSON.stringify(value);
        localStorage.setItem(key, serializedState);
    } catch (error) {
        console.error("Set state error: ", error.message);
    }
};

const load = key => {
    try {
        const serializedState = localStorage.getItem(key);
        return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
        console.error("Get state error: ", error.message);
    }
};
const saveAll = (arrKeys, value) => arrKeys.forEach((key, index) => save(key, value[index]));
const clearAll = arrKeys => arrKeys.forEach(key => window.localStorage.removeItem(key));

export const storage = {
    save,
    load,
    saveAll,
    clearAll
};