import { NativeBaseProvider, Text } from "native-base"
import { TransactionStackParamList } from "../../router";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type MyTxsProps = NativeStackScreenProps<TransactionStackParamList, "MyTransactionsStack">

const MyTxsScreen: React.FunctionComponent<MyTxsProps> = (props: MyTxsProps) => {
	return (
		<NativeBaseProvider>
			<Text>MyTransactions</Text>
		</NativeBaseProvider>
	)
}

export default MyTxsScreen;
