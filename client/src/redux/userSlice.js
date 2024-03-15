import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        userId: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.userId = action.payload.userId;
    },
   
    },
    });

    export const { setUser, reloadUserData } = userSlice.actions;
