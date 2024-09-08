import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("userDetails")) || null,
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
        }
    }
});

export const {login, logout} = userSlice.actions;

export default userSlice.reducer;
