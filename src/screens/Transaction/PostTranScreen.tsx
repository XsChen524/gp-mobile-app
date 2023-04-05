import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Center, Column, Divider, FormControl, Heading, Input, NativeBaseProvider, Row, ScrollView, Text, VStack } from "native-base"
import { TransactionStackParamList } from "../../router";
import { Tx } from "../../services/transaction";
import { useAppSelector } from "../../redux/hooks";
import { selectAuthState } from "../../redux/AuthSlice";
import { useReducer } from "react";
import { updateTransactionSync } from "../../services/transaction/transaction";

type PostTranProps = NativeStackScreenProps<TransactionStackParamList, "PostTranStack">

type FormState = {
	rate?: number;
	comment?: string;
};

const TxDetailEntry: React.FunctionComponent<{
	des: string, text: string | number | undefined
}> = (props: { des: string, text: string | number | undefined }) => {
	return (
		<>
			<Row my={"2"} alignItems={"center"} space={"lg"}>
				<Column width={"1/2"}>
					<Text fontSize={"md"} bold >{props.des}:</Text>
				</Column>
				<Column>
					<Text>{props.text}</Text>
				</Column>
			</Row>
			<Divider />
		</>
	)
}

const TxDetail: React.FunctionComponent<{
	tx: Tx.TxCreateReturnParams
}> = (props: { tx: Tx.TxCreateReturnParams }) => {
	return (
		<Box
			minH={"100"}
			width={"full"}
		>
			<Text fontSize={"lg"} bold marginBottom={"2"}>You have finished a transaction!</Text>
			<TxDetailEntry des={"Transaction ID"} text={props.tx.txId} />
			<TxDetailEntry des={"Price"} text={props.tx.price} />
			<TxDetailEntry des={"Order State"} text={props.tx.state} />
		</Box>
	)
}



const formReducer = (state: FormState, action: { type: string; payload: string }): FormState => {
	const { type, payload } = action;
	return { ...state, [type]: payload };
};

const CommentForm: React.FunctionComponent<{ txId: number } & PostTranProps> = (props: { txId: number } & PostTranProps) => {
	const authState = useAppSelector(selectAuthState);
	const initialState: FormState = {
		rate: undefined,
		comment: undefined
	}

	const [formState, formDispatch] = useReducer(formReducer, initialState);

	const handleChange = (type: string, payload: string): void => {
		formDispatch({ type, payload });
	};

	const submit = (): void => {
		updateTransactionSync(props.txId, {
			state: "successful",
			sellerRate: 5,
			buyerRate: formState.rate as number,
			comment: formState.comment as string
		}, authState.userToken as string).then((data) => {
			if (data) {
				props.navigation.navigate('TransactionStack');
			}
		})
	}

	return (

		<Box safeArea p="2" w="90%" maxW="290" py="8">
			<Heading size="lg" color="coolGray.800" fontWeight="semibold">
				<Text>Leave your comments</Text>
			</Heading>
			<VStack space={3} mt="5">
				<FormControl>
					<FormControl.Label>Price you ask</FormControl.Label>
					<Input type='number' keyboardType='numeric' placeholder="1 - 5" onChangeText={(text) => {
						handleChange("rate", text);
					}} />
				</FormControl>
				<FormControl>
					<FormControl.Label>Description</FormControl.Label>
					<Input type='text' h={'20'} onChangeText={(text) => {
						handleChange("comment", text);
					}} />
				</FormControl>
				<Button
					onPress={submit}
				>Submit</Button>
			</VStack>
		</Box>

	)
}

const PostTranScreen: React.FunctionComponent<PostTranProps> = (props: PostTranProps) => {
	const tx: Tx.TxCreateReturnParams = props.route.params.tx;
	return (
		<NativeBaseProvider>
			<ScrollView
				width={"full"}
				height={"full"}
				px={"10"}
				paddingTop={"3"}
			>
				<Center w="100%">
					<TxDetail tx={tx} />
					<CommentForm txId={tx.txId} {...props} />
				</Center>
			</ScrollView>
		</NativeBaseProvider>
	)
}

export default PostTranScreen;
