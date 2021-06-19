import { UserActionTypes } from "./user.types";

export const setCurrentUser = (user) => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user,
});

export const addItem = (item) => ({
    type: UserActionTypes.ADD_ITEM,
    payload: item,
});

export const deleteItem = (item) => ({
    type: UserActionTypes.DELETE_ITEM,
    payload: item,
});

export const deleteAllItems = () => ({
    type: UserActionTypes.DELETE_ALL_ITEMS,
    payload: null,
});
