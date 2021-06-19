import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";

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
    shoppingAppUser: userReducer,
});

export default persistReducer(persistConfig, rootReducer);

// export default rootReducer;
