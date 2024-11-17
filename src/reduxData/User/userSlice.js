import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("userDetails")) || null,
    isAdd: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state,action) => {
            state.user = action.payload;
            localStorage.setItem("userDetails", JSON.stringify(action.payload));
        },
        logout: (state) => {
            localStorage.clear();
            state.user = null;
        },
        addingUser: (state,action) => {
            state.isAdd = action.payload;
        },
    }
});

export const {login, logout, addingUser} = userSlice.actions;

export default userSlice.reducer;
