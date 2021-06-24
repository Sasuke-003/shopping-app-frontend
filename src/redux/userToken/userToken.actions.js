import { UserTokenActionTypes } from "./userToken.types";

export const setCurrentUserToken = (token) => ({
    type: UserTokenActionTypes.SET_CURRENT_USER_TOKEN,
    payload: token,
});
