export namespace Item {
	export interface ItemPostBody {
		userId: number;
		itemName: string;
		itemDes: string;
		askPrice: number;
		// picUrl: string;
	}

	export interface Item {
		id: number;
		seller_id: number;
		pic_url: string;
		item_name: string;
		item_description: string;
		state: string;
		price: number;
		updatedAt: string;
		createdAt: string;
	}

	export interface ItemCreateResponse {
		status: boolean;
		data: Item;
	}

	export interface ItemGetAllResponse {
		status: boolean;
		data: Item[];
	}
}
