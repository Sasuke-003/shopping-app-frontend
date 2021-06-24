import { UserTokenActionTypes } from "./userToken.types";

const INITIAL_STATE = "Hello";

const userTokenReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserTokenActionTypes.SET_CURRENT_USER_TOKEN:
            return action.payload;

        default:
            return state;
    }
};

export default userTokenReducer;
