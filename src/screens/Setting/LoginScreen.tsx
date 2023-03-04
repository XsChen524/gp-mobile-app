import * as React from 'react';
import { Box, Button, Center, FormControl, HStack, Heading, Input, Link, NativeBaseProvider, Text, VStack } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SettingStackParamList } from "../../router";

type IProps = NativeStackScreenProps<SettingStackParamList, "LoginStack">;

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
	return (
		<>
			<FormControl>
				<FormControl.Label>Email ID</FormControl.Label>
				<Input />
			</FormControl>
			<FormControl>
				<FormControl.Label>Password</FormControl.Label>
				<Input type="password" />
			</FormControl>
			<Button marginTop={8} mt="2" height={12} color="primary.500">
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