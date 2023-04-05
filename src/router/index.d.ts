export type AppTabParamList = {
	Home: undefined;
	Market: undefined;
	Order: undefined;
	Settings: undefined;
};

export type SettingStackParamList = {
	SettingStack: undefined;
	LoginStack: undefined;
	SignupStack: undefined;
};

export type OrderStackParamList = {
	OrderStack: undefined;
	OrderCreateStack: undefined;
	OrderDetailStack: {
		item: import("../services/item/index").Item.Item;
	};
};

export type TransactionStackParamList = {
	TransactionStack: undefined;
	TransactionDetailStack: {
		item: import("../services/item/index").Item.Item;
	};
	PostTranStack: {
		tx: import("../services/transaction/index").Tx.TxCreateReturnParams;
	};
	MyTransactionsStack: {
		txs: import("../services/transaction/index").Tx.TxUpdateReturnParams[];
	};
	MyTransactionDetailStack: {
		tx: import("../services/transaction/index").Tx.TxUpdateReturnParams;
	};
};
