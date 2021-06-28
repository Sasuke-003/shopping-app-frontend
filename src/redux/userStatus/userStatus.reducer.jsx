import { UserStatusActionTypes } from "./userStatus.types";

const INITIAL_STATE = {
    currentUserStatus: {
        isLoggedIn: false,
        isAdmin: true,
        tabStatus: 1,
    },
};

const userStatusReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserStatusActionTypes.SET_CURRENT_USER_ALL_STATUS:
            return {
                ...state,
                currentUserStatus: action.payload,
            };
        case UserStatusActionTypes.SET_CURRENT_USER_IS_LOGGED_IN:
            return {
                ...state,
                currentUserStatus: {
                    ...state.currentUserStatus,
                    isLoggedIn: action.payload,
                },
            };
        case UserStatusActionTypes.SET_CURRENT_USER_IS_ADMIN:
            return {
                ...state,
                currentUserStatus: {
                    ...state.currentUserStatus,
                    isAdmin: action.payload,
                },
            };
        case UserStatusActionTypes.SET_CURRENT_USER_STATUS:
            return {
                ...state,
                currentUserStatus: {
                    ...state.currentUserStatus,
                    [action.payload[0]]: action.payload[1],
                },
            };
        default:
            return state;
    }
};

export default userStatusReducer;
