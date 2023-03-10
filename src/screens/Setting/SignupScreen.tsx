import * as React from "react";
import { useState, useReducer } from "react";
import {
	Box,
	Button,
	Center,
	FormControl,
	Heading,
	Input,
	NativeBaseProvider,
	VStack,
	useToast,
} from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { SettingStackParamList } from "../../router";
import { postSignupSync } from "../../services/auth/auth";

type IProps = NativeStackScreenProps<SettingStackParamList, "SignupStack">;
type FormState = {
	name: undefined | string;
	email: undefined | string;
	password: undefined | string;
};
type FormStateNotUndefined = {
	name: string;
	email: string;
	password: string;
};

const formReducer = (
	state: FormState,
	action: { type: string; payload: string }
): FormState => {
	const { type, payload } = action;
	return { ...state, [type]: payload };
};

const Header: React.FC<IProps> = (props: IProps) => {
	return (
		<>
			<Heading size="lg" fontWeight="600" color="coolGray.800">
				Sign Up
			</Heading>
		</>
	);
};

const SignupForm: React.FunctionComponent<IProps> = (props: IProps) => {
	const initialState: FormState = {
		name: undefined,
		email: undefined,
		password: undefined,
	};

	const [formState, formDispatch] = useReducer(formReducer, initialState);
	const [isRePassword, setRePassword] = useState<boolean>(false);
	const toast = useToast();

	const handleChange = (type: string, payload: string): void => {
		formDispatch({ type, payload });
	};

	/**
	 * Check the retype password
	 * @param {string} rePassword
	 * @return {boolean} false if the password matches
	 */
	const passwordCheck = (rePassword: string): void => {
		if (rePassword == formState.password) {
			setRePassword(true);
		} else {
			setRePassword(false);
		}
	};

	return (
		<>
			<FormControl>
				<FormControl.Label>Username</FormControl.Label>
				<Input
					type="text"
					value={formState.name}
					onChangeText={(text) => {
						handleChange("name", text);
					}}
				/>
			</FormControl>
			<FormControl>
				<FormControl.Label>Email</FormControl.Label>
				<Input
					type="email"
					value={formState.email}
					onChangeText={(text) => {
						handleChange("email", text);
					}}
				/>
			</FormControl>
			<FormControl>
				<FormControl.Label>Password</FormControl.Label>
				<Input
					key="123"
					type="password"
					value={formState.password}
					onChangeText={(text) => {
						handleChange("password", text);
					}}
				/>
			</FormControl>
			<FormControl>
				<FormControl.Label>Verify password</FormControl.Label>
				<Input
					borderColor="muted.300"
					type="password"
					onChangeText={(text) => {
						passwordCheck(text);
					}}
				/>
				{isRePassword ? null : (
					<FormControl>
						<FormControl.HelperText>
							Password doesn't match.
						</FormControl.HelperText>
					</FormControl>
				)}
			</FormControl>
			{isRePassword ? (
				<Button marginTop={5} height={10} mt="2" color="primary.500"
					onPress={() => {
						if (Object.entries(formState).every(entry => (typeof entry[1] !== 'undefined' && entry[1] != ""))) {
							postSignupSync(formState as FormStateNotUndefined).then((res) => {
								if (res.status == 200) {
									props.navigation.goBack();
								} else {
									toast.show({
										duration: 1000,
										title: "Signup failed",
										description: res.responseBody.msg
									})
								}
							})
						} else {
							toast.show({
								duration: 1000,
								title: "Unfilled space",
								description: "Please fill in all blanks."
							})
						}
					}}>
					Submit
				</Button>
			) : (
				<Button
					marginTop={5}
					height={10}
					mt="2"
					color="primary.500"
					isDisabled={true}
				>
					Submit
				</Button>
			)}
		</>
	);
};

const SignupScreen: React.FunctionComponent<IProps> = (props: IProps) => {
	return (
		<NativeBaseProvider>
			<Center w="100%">
				<Box safeArea p="2" py="8" w="90%" maxW="290">
					<Header {...props} />
					<VStack space={3} mt="5">
						<SignupForm {...props} />
					</VStack>
				</Box>
			</Center>
		</NativeBaseProvider>
	);
};

export default SignupScreen;
