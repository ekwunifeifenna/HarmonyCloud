import { createSlice } from "@reduxjs/toolkit";

export const alertsSlice = createSlice({
    name: "alert",
    initialState: {
        loading: false,
    },
    reducers: {
        showLoading: (state) => {
            state.loading = true;
    },
    hideLoading: (state) => {
        state.loading = false;
    },
    },
    });

    export const { showLoading, hideLoading } = alertsSlice.actions;