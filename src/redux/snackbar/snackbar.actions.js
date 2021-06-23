import { SnackbarActionTypes } from "./snackbar.types";

export const openSnackbar = (status) => ({
    type: SnackbarActionTypes.OPEN_SNACKBAR,
    payload: status,
});
