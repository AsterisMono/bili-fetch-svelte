export interface BiliCidResult {
	code: number;
	message: string;
	data: {
		cid: number;
	}[];
}

export interface BiliInfoResult {
	code: number;
	message: string;
	data: {
		pic: string;
		title: string;
		owner: {
			mid: number;
			name: string;
			face: string;
		};
	};
}

export interface BiliVideoResult {
	code: number;
	message: string;
	data: {
		durl: {
			url: string;
		}[];
	};
}
