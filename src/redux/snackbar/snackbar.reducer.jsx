import { SnackbarActionTypes } from "./snackbar.types";

const INITIAL_STATE = {
    open: false,
    msg: "success",
    status: "success",
    popupOpen: false,
    popupMsg: "",
    popupYesFunc: null,
};

const snackbarReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SnackbarActionTypes.OPEN_SNACKBAR:
            let temp = Object.assign({}, state);
            Object.keys(action.payload).forEach((key) => {
                temp[key] = action.payload[key];
            });
            return temp;
        default:
            return state;
    }
};

export default snackbarReducer;
