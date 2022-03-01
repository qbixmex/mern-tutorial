import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Auth from '../../Interfaces/AuthInterfaces';

// Get User from LocalStorage
const userJson = localStorage.getItem("user");
const user: string | null = !userJson ? null : JSON.parse(userJson);

const initialState: Auth = {
    user: user,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: ( state ) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError   = false;
            state.message = "";
        }
    },
    extraReducers: () => {}
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;