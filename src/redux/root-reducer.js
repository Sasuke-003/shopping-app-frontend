import { combineReducers } from "redux";
import userStatusReducer from "./userStatus/userStatus.reducer";
import userTokenReducer from "./userToken/userToken.reducer";
import snackbarReducer from "./snackbar/snackbar.reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["shoppingAppUser"],
    stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
    userStatus: userStatusReducer,
    userToken: userTokenReducer,
    snackbar: snackbarReducer,
});

export default persistReducer(persistConfig, rootReducer);

// export default rootReducer;
