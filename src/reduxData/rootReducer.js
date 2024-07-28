import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./User/userSlice";


const rootReducer = combineReducers({
    auth: userSlice
});

export default rootReducer;