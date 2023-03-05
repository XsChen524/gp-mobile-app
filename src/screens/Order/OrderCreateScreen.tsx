import React from 'react'
import { View, Text, NativeBaseProvider } from 'native-base';

const OrderCreateScreen: React.FunctionComponent<{}> = () => {
	return (
		<NativeBaseProvider>
			<View
				style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
			>
				<Text>Create an order</Text>
			</View>
		</NativeBaseProvider>

	);
}

export default OrderCreateScreen;
