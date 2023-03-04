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
	const authDispatch = useAppDispatch();
	const [loading, setloading] = useState(authState.isLoading);

	const bootstrapAsync = async () => {
		getUserDataFromStorage().then((userData) => {
			if (typeof userData.userEmail === "undefined")
				authDispatch(signedOutAtBootstrap(null));
			authDispatch(restoreUserData(userData));
			setloading(false);
		});
	};

	useEffect(() => {
		if (loading == true) bootstrapAsync();
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
