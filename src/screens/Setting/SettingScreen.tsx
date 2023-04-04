import * as React from "react"
import { useEffect, useState } from "react";
import {
	NativeBaseProvider,
	Box,
	FlatList,
	Button,
	Divider,
	HStack,
	VStack,
	View,
	Text,
} from "native-base";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectAuthState, signOut, showAuth } from "../../redux/AuthSlice";
import MenuItem from "../../components/MenuItem";
import Avatar from '../../components/Avatar';
import type { SettingStackParamList } from "../../router";
import { authFormattedLog, deleteUserDataFromStorage, getUserDataFromStorage } from "../../utils/utils";
import { User } from "../../services/user";
import { getUserByIdSync } from "../../services/user/user";
import { useIsFocused } from "@react-navigation/native";


type IProps = NativeStackScreenProps<SettingStackParamList, 'SettingStack'>;

const Profile: React.FunctionComponent<{}> = () => {
	const [user, setUser] = useState<User | undefined>(undefined);
	const authState = useAppSelector(selectAuthState);
	const isFocused = useIsFocused();

	useEffect(() => {
		if (authState.userId && authState.userToken) {
			getUserByIdSync(authState.userId, authState.userToken).then((data) => {
				setUser(data);
			})
		} else {
			setUser(undefined);
		}
	}, [isFocused, authState.isSignout]);

	return (
		<Box
			mx={"2"}
			my={"3"}
			style={{
				borderRadius: 10,
				height: 100,
			}} bgColor={"primary.600"}>
			<HStack flex={1} alignItems={"center"}>
				{
					!user ?
						<Text color={"white"} fontSize={"lg"}>Please login</Text> :
						<>
							<View style={{ marginLeft: 10, marginRight: 15 }}>
								<Avatar />
							</View>
							<VStack space={2}>
								<Text style={{ color: "white" }} fontSize={"lg"}>{authState.userName}</Text>
								<Text style={{ color: "white" }} fontSize={"sm"}>Balance: {user.balance.toFixed(2)}    Rank: {user.rank}</Text>
							</VStack>
						</>
				}
			</HStack>
		</Box >
	)
}

/**
 * Flatlist MenuItem onclick TBD
 */
const Settings = () => {
	const data = [
		{
			id: 1,
			func: "Profile",
			componentName: "person",
		},
		{
			id: 2,
			func: "Preferences",
			componentName: "settings",
		},
		{
			id: 3,
			func: "Contributors",
			componentName: "emoji-people",
		},
		{
			id: 4,
			func: "Privacy Policy & Terms of Service",
			componentName: "privacy-tip",
		},
	];
	return (
		<Box>
			<FlatList
				data={data}
				renderItem={({ item }) => (
					<MenuItem
						{...item}
						onclick={() => {
							console.log("Button Pressed: ", item.id);
						}}
					/>
				)}
				keyExtractor={(item) => item.id.toString()}
			/>
		</Box>
	);
};

const Buttons: React.FunctionComponent<IProps> = (props: IProps) => {
	const authState = useAppSelector(selectAuthState);
	const dispatch = useAppDispatch();
	return (
		<VStack space={"sm"} mt={"3"}>
			<Button
				width={"300"}
				onPress={() => {
					props.navigation.navigate("LoginStack");
				}}
			>
				Login
			</Button>
			{
				authState.isSignout ? undefined :
					<Button
						width={"300"}
						onPress={() => {
							dispatch(signOut(null));
							deleteUserDataFromStorage();
						}}
					>
						Sign Out
					</Button>
			}
			<Button
				variant="outline" colorScheme="primary"
				borderWidth={"2"}
				width={"300"}
				onPress={() => {
					dispatch(showAuth(null));
					authFormattedLog(authState);
				}}
			>
				Show Redux in console
			</Button>
			<Button
				variant="outline" colorScheme="primary"
				borderWidth={"2"}
				width={"300"}
				onPress={async () => {
					getUserDataFromStorage().then((storedUserData) => {
						console.log("\x1B[33mData in SecureStore:\x1B[0m");
						console.log(storedUserData);
					});
				}}
			>
				Show SecureStore in console
			</Button>
		</VStack>
	);
};

const SettingScreen: React.FunctionComponent<IProps> = (props: IProps) => {
	return (
		<NativeBaseProvider>
			<Box>
				<Profile />
				<Settings />
				<Divider />
				<Box alignItems="center">
					<Buttons {...props} />
				</Box>
			</Box>
		</NativeBaseProvider>
	);
};

export default SettingScreen;
