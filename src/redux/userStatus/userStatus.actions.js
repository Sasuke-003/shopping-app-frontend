import { UserStatusActionTypes } from "./userStatus.types";

export const setCurrentUserAllStatus = (status) => {
    return {
        type: UserStatusActionTypes.SET_CURRENT_USER_ALL_STATUS,
        payload: status,
    };
};
export const setCurrentUserIsLoggedIn = (status) => {
    return {
        type: UserStatusActionTypes.SET_CURRENT_USER_IS_LOGGED_IN,
        payload: status,
    };
};
export const setCurrentUserIsAdmin = (status) => {
    return {
        type: UserStatusActionTypes.SET_CURRENT_USER_IS_ADMIN,
        payload: status,
    };
};
export const setCurrentUserStatus = (status) => {
    return {
        type: UserStatusActionTypes.SET_CURRENT_USER_STATUS,
        payload: status,
    };
};
