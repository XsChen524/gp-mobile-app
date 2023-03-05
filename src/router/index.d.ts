export type AppTabParamList = {
	Home: undefined;
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
