import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
};

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        start_loading: (state) => {
            state.isLoading = true;
        },
        stop_loading: (state) => {
            state.isLoading = false;
        }
    }
});

export const { start_loading, stop_loading } = loaderSlice.actions;

export default loaderSlice.reducer;