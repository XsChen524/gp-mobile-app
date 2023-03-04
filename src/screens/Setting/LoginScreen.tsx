import * as React from 'react';
import { Box, Button, Center, FormControl, Heading, Input, NativeBaseProvider, VStack, useToast } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SettingStackParamList } from "../../router";
import { useReducer } from 'react';
import { postLoginSync } from '../../services/auth';
import { signIn } from '../../redux/AuthSlice';
import { useAppDispatch } from '../../redux/hooks';
import { saveUserDataToStorage } from '../../utils/utils';

type IProps = NativeStackScreenProps<SettingStackParamList, "LoginStack">;

type LoginState = {
	email: undefined | string;
	password: undefined | string;
};

type LoginStateNotUndefined = {
	email: string;
	password: string;
};

const loginReducer = (
	state: LoginState,
	action: { type: string; payload: string }
): LoginState => {
	const { type, payload } = action;
	return { ...state, [type]: payload };
};

const Header: React.FC<IProps> = (props: IProps) => {
	return (
		<>
			<Heading size="lg" fontWeight="600" color="coolGray.800">
				Welcome
			</Heading>
			<Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
				Sign in to continue!
			</Heading>
		</>
	);
}

const LoginForm: React.FunctionComponent<IProps> = (props: IProps) => {
	const dispatch = useAppDispatch();

	const initialState: LoginState = {
		email: undefined,
		password: undefined,
	};

	const [loginState, loginDispatch] = useReducer(loginReducer, initialState);
	const toast = useToast();

	const handleChange = (type: string, payload: string): void => {
		loginDispatch({ type, payload });
	};

	return (
		<>
			<FormControl>
				<FormControl.Label>Email ID</FormControl.Label>
				<Input type="email" onChangeText={(text) => {
					handleChange("email", text);
				}} />
			</FormControl>
			<FormControl>
				<FormControl.Label>Password</FormControl.Label>
				<Input type="password" onChangeText={(text) => {
					handleChange("password", text);
				}} />
			</FormControl>
			<Button marginTop={8} mt="2" height={12} color="primary.500"
				onPress={() => {
					if (Object.entries(loginState).every(entry => {
						return typeof entry[1] !== 'undefined' && entry[1] != "";
					})) {
						postLoginSync(loginState as LoginStateNotUndefined).then((res) => {
							if (res.status == 200) {
								const userData = {
									userId: res.response.data?.id,
									userEmail: res.response.data?.email,
									userName: res.response.data?.name,
									userToken: res.response.data?.token,
								}
								saveUserDataToStorage(userData);
								dispatch(signIn(userData));
								props.navigation.goBack();
							} else {
								toast.show({
									duration: 5000,
									title: "Login failed",
									description: res.response.msg
								})
							}
						})
					} else {
						toast.show({
							duration: 2000,
							title: "Unfilled space",
							description: "Please fill in all blanks."
						})
					}
				}}
			>
				Login
			</Button>
			<Button marginTop={6} mt="2" height={12} color="primary.300"
				onPress={() => {
					props.navigation.navigate("SignupStack");
				}}
			>
				Sign Up
			</Button>
		</>
	);
}

const LoginScreen: React.FunctionComponent<IProps> = (props: IProps) => {
	return (
		<NativeBaseProvider>
			<Center w="100%">
				<Box safeArea p="2" py="8" w="90%" maxW="290">
					<Header {...props} />
					<VStack space={3} mt="5">
						<LoginForm {...props} />
					</VStack>
				</Box>
			</Center>
		</NativeBaseProvider>
	);
};

export default LoginScreen;
