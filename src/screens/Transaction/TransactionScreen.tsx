import React from "react";
import { NativeBaseProvider, Text } from "native-base";

const TransactionScreen: React.FC = () => {
	return (
		<NativeBaseProvider>
			<Text>Transaction</Text>
		</NativeBaseProvider>
	)
}

export default TransactionScreen;
