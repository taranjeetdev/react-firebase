import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./User/userSlice";
import loaderSlice from "./Loader/loaderSlice";


const rootReducer = combineReducers({
    auth: userSlice,
    loader: loaderSlice,
});

export default rootReducer;