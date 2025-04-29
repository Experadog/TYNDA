export type ClientHistory = {
	translates: unknown;
	client_email: string;
	card_id: string;
	discount: number;
	establishment_id: string;
	created_time: string;
	establishment: {
		id: string;
		name: string;
		status: 'enable' | 'disable';
		discount: number;
		cover: string;
		address: string;
		category: string;
	};
};
