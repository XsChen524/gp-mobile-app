import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface AuthState {
	isLoading: boolean;
	isSignout: boolean;
	userId: number | undefined;
	userEmail: string | undefined;
	userName: string | undefined;
	userToken: string | undefined;
}

interface UserData {
	userId: number | undefined;
	userEmail: string | undefined;
	userName: string | undefined;
	userToken: string | undefined;
}

const initialState: AuthState = {
	isLoading: true,
	isSignout: false,
	userId: undefined,
	userName: undefined,
	userToken: undefined,
	userEmail: undefined,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		/**
		 * Restore token when bootstrap the app
		 * @param {AuthState} state current auth state
		 */
		restoreUserData: (state, action: PayloadAction<UserData>) => {
			state.isLoading = false;
			state.userId = action.payload.userId;
			state.userEmail = action.payload.userEmail;
			state.userName = action.payload.userName;
			state.userToken = action.payload.userToken;
		},

		/**
		 * Signin the app
		 * @param {AuthState} state current auth state
		 * @param action { T, P } Payload is an object
		 */
		signIn: (state, action: PayloadAction<UserData>) => {
			state.isSignout = false;
			state.userId = action.payload.userId;
			state.userEmail = action.payload.userEmail;
			state.userName = action.payload.userName;
			state.userToken = action.payload.userToken;
		},

		/**
		 * Signout the app, clean the token
		 * @param {AuthState} state current auth state
		 */
		signOut: (state, action: PayloadAction<null>) => {
			state.isSignout = true;
			state.userId = undefined;
			state.userEmail = undefined;
			state.userName = undefined;
			state.userToken = undefined;
		},

		signedOutAtBootstrap: (state, action) => {
			state.isSignout = true;
		},

		showAuth: (state, action) => {
			state.isSignout = state.isSignout;
		},
	},
});

export const {
	restoreUserData,
	signedOutAtBootstrap,
	signIn,
	signOut,
	showAuth,
} = authSlice.actions;

export const selectAuthState = (state: RootState): AuthState => state.auth;

export default authSlice.reducer;
