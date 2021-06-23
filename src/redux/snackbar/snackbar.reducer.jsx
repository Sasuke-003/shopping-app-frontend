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
            return action.payload;

        default:
            return state;
    }
};

export default snackbarReducer;
