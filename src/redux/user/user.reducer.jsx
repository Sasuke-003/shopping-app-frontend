import { UserActionTypes } from "./user.types";

const addDataHandle = (data, prevData) => {
    let postData = prevData;

    if (postData[data.name] === undefined) {
        postData[data.name] = {};
    }
    if (postData[data.name]["price"] === undefined) {
        postData[data.name]["price"] = data.price;
    }
    if (postData[data.name][data.size] === undefined) {
        postData[data.name][data.size] = 0;
    }

    postData[data.name][data.size] += 1;

    return postData;
};

const deleteDataHandle = (data, prevData) => {
    let postData = prevData;
    postData[data.name][data.size] -= 1;
    if (postData[data.name][data.size] === 0) {
        delete postData[data.name][data.size];
    }
    console.log(Object.keys(postData[data.name]).length);
    if (Object.keys(postData[data.name]).length === 1) delete postData[data.name];
    return postData;
};

const INITIAL_STATE = {
    currentUser: null,
    cart: {},
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
            };
        case UserActionTypes.ADD_ITEM:
            return {
                ...state,
                cart: addDataHandle(action.payload, state["cart"]),
            };
        case UserActionTypes.DELETE_ITEM:
            return {
                ...state,
                cart: deleteDataHandle(action.payload, state["cart"]),
            };
        case UserActionTypes.DELETE_ALL_ITEMS:
            return {
                ...state,
                cart: {},
            };
        default:
            return state;
    }
};

export default userReducer;
