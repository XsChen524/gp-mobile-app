import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { HomeScreen, SettingScreen, LoginScreen, SignupScreen } from '../screens';
import type { AppTabParamList, SettingStackParamList } from ".";

const Tab = createBottomTabNavigator<AppTabParamList>();
const SettingStack = createNativeStackNavigator<SettingStackParamList>(); // Create Native Stack Navigator

const AppSettingStack: React.FunctionComponent<{}> = () => {
	return (
		<SettingStack.Navigator initialRouteName="SettingStack">
			<SettingStack.Screen
				name="SettingStack"
				component={SettingScreen}
				options={{
					title: "Settings",
				}}
			/>
			<SettingStack.Screen
				name="LoginStack"
				component={LoginScreen}
				options={{
					title: "Login",
				}}
			/>
			<SettingStack.Screen
				name="SignupStack"
				component={SignupScreen}
				options={{
					title: "Sign up",
				}}
			/>
		</SettingStack.Navigator>
	);
};

const AppTabNavigation: React.FunctionComponent<{}> = () => {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="home"
							color={color}
							size={size}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Settings"
				component={AppSettingStack}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="settings"
							color={color}
							size={size}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
}

export default AppTabNavigation;
