export namespace Tx {
	interface TxCreateParams {
		sellerId: number;
		userId: number;
		itemId: number;
		askPrice: number;
	}

	interface TxCreateReturnParams {
		state: string;
		txId: number;
		sellerId: number;
		buyerId: number;
		itemId: number;
		price: number;
		createdAt: string;
		updatedAt: string;
	}

	interface TxUpdateParams {
		state: string; // successful, pending or failed
		sellerRate: number;
		buyerRate: number; // Rate given by buyer
		comment: string;
	}

	interface TxUpdateReturnParams {
		txId: number;
		sellerId: number;
		buyerId: number;
		itemId: number;
		price: number;
		state: string;
		sellerRate: number;
		buyerRate: number;
		comment: string;
		createdAt: string;
		updatedAt: string;
	}
}
