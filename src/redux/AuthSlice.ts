import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface AuthState {
    isLoading: boolean,
    isSignout: boolean,
    userToken: string,
}

const initialState: AuthState = {
	isLoading: true,
	isSignout: false,
	userToken: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        /**
         * Restore token when bootstrap the app
         * @param {AuthState} state current auth state
         */
        restoreToken: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.userToken = action.payload;
        },

        /**
         * Signin the app
         * @param {AuthState} state current auth state
         * @param action { T, P } Payload is an object
         */
        signIn: (state, action: PayloadAction<string>) => {
            state.isSignout = false;
            state.userToken = action.payload;
        },

        /**
         * Signout the app, clean the token
         * @param {AuthState} state current auth state
         */
        signOut: (state, action) => {
            state.isSignout = true;
            state.userToken = null;
        },
    }
});

export const { restoreToken, signIn, signOut } = authSlice.actions;

export const selectAuthState = (state: RootState): AuthState => state.auth;

export default authSlice.reducer;