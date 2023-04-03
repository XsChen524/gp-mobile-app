import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { HomeScreen, SettingScreen, LoginScreen, SignupScreen, OrderScreen, OrderCreateScreen, OrderDetailScreen, TransactionScreen } from '../screens';
import { AppTabParamList, OrderStackParamList, SettingStackParamList, TransactionStackParamList } from ".";

const Tab = createBottomTabNavigator<AppTabParamList>();
const SettingStack = createNativeStackNavigator<SettingStackParamList>();
const OrderStack = createNativeStackNavigator<OrderStackParamList>();
const TransactionStack = createNativeStackNavigator<TransactionStackParamList>();

const AppTransactionStack: React.FC = () => {
	return (
		<TransactionStack.Navigator initialRouteName='TransactionStack'>
			<TransactionStack.Screen
				name="TransactionStack"
				component={TransactionScreen}
				options={{
					title: "Market"
				}}
			/>
		</TransactionStack.Navigator>
	)
}

const AppOrderStack: React.FC = () => {
	return (
		<OrderStack.Navigator initialRouteName='OrderStack'>
			<OrderStack.Screen
				name="OrderStack"
				component={OrderScreen}
				options={{
					title: "Orders"
				}}
			/>
			<OrderStack.Screen
				name="OrderCreateStack"
				component={OrderCreateScreen}
				options={{
					title: "Create an order"
				}}
			/>
			<OrderStack.Screen
				name="OrderDetailStack"
				component={OrderDetailScreen}
				options={{
					title: "Item Details"
				}}
			/>
		</OrderStack.Navigator>
	);
}

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
				name="Market"
				component={AppTransactionStack}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Octicons
							name="list-ordered"
							color={color}
							size={size}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Order"
				component={AppOrderStack}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Octicons
							name="list-ordered"
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
