const loadFromLocalStorage = () => {
    const serializedState = localStorage.getItem('state');
    if (serializedState == null) return undefined;
    return JSON.parse(serializedState)
}

const saveToLocalStorage = (state) => {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
}

export const storeService = {
    loadFromLocalStorage,
    saveToLocalStorage
}