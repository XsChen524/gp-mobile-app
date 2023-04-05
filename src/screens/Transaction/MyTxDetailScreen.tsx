import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NativeBaseProvider, Text } from "native-base"
import { TransactionStackParamList } from "../../router";

type MyTxDetailProps = NativeStackScreenProps<TransactionStackParamList, "MyTransactionDetailStack">

const MyTxDetailScreen: React.FunctionComponent<MyTxDetailProps> = (props: MyTxDetailProps) => {
	return (
		<NativeBaseProvider>
			<Text>MyTransactionDetail</Text>
		</NativeBaseProvider>
	)
}

export default MyTxDetailScreen;
