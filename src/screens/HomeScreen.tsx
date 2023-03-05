import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
	restoreUserData,
	selectAuthState,
	signedOutAtBootstrap,
} from "../redux/AuthSlice";
import { getUserDataFromStorage } from "../utils/utils";

const HomeScreen: React.FC = () => {
	/**
	 * The section bellow is for loading and checking user auth state
	 * when bootstrap the app and get to the index
	 */
	const authState = useAppSelector(selectAuthState);
	const dispatch = useAppDispatch();
	const [loading, setloading] = useState(authState.isLoading);

	const bootstrapSync = async () => {
		getUserDataFromStorage().then((userData) => {
			dispatch(restoreUserData(userData));
			/**
			 * If userEmail undefined, claim user is not logged in
			 */
			if (typeof userData.userEmail === "undefined")
				dispatch(signedOutAtBootstrap(null));
			setloading(false);
		});
	};

	useEffect(() => {
		if (loading == true) bootstrapSync();
	}, []);
	/**
	 * End of bootstrap
	 */

	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<Text>Hello world</Text>
		</View>
	);
};

export default HomeScreen;
