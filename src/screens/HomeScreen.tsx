import React, { useState, useEffect } from "react";
import { View, Linking } from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
	restoreUserData,
	selectAuthState,
	signedOutAtBootstrap,
} from "../redux/AuthSlice";
import { getUserDataFromStorage } from "../utils/utils";
import { Box, VStack, Divider, NativeBaseProvider, Image, Text, Button, Link } from "native-base";

const HomeCard: React.FunctionComponent<{ userName: string | undefined }> = (props: { userName: string | undefined }) => {
	return (
		<Box borderWidth={"1"} borderRadius={"20"} overflow={"hidden"}>
			<VStack divider={<Divider />}>
				<Box background={"#272727"}>
					<Image alt={"React Native"} style={{
						width: 320,
						height: 320
					}} source={require("../assets/images/react.png")} ></Image>
				</Box>
				<Box px="4" py="4">
					<Text fontSize={"md"}> {props.userName ? `Welcome, ${props.userName}!` : "Welcome!"} </Text>
					<Divider my={"2"}></Divider>
					<Text fontSize={"sm"}>This is COMP7506 Group 04 Project</Text>
					<Text mt={"2"} fontSize={"sm"}>TypeScript + React Native + ♥</Text>
					<Button my={"3"} onPress={() => {
						var url = 'https://github.com/XsChen524/gp-mobile-app'

						Linking.canOpenURL(url).then(supported => {
							if (!supported) {
								console.warn('Can\'t handle url: ' + url);
							} else {
								return Linking.openURL(url);
							}
						}).catch(err => console.error('An error occurred', err));
					}}>GitHub</Button>
				</Box>
			</VStack>
		</Box>
	);
}

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
		<NativeBaseProvider>
			<View
				style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
			>
				<HomeCard userName={authState.userName} />
			</View>
		</NativeBaseProvider>
	);
};

export default HomeScreen;
