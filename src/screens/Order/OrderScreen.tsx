import React from 'react'
import { View, Text, NativeBaseProvider } from 'native-base';
import { useAppSelector } from '../../redux/hooks';
import { selectAuthState } from '../../redux/AuthSlice';

const OrderScreen: React.FunctionComponent<{}> = () => {
	const authState = useAppSelector(selectAuthState);
	console.log(authState);

	return (
		<NativeBaseProvider>
			<View
				style={{ flex: 1, alignItems: "center", justifyContent: "flex-start", borderWidth: 2 }}
			>
				<Text>Orders</Text>
			</View>
		</NativeBaseProvider>

	);
}

export default OrderScreen;
