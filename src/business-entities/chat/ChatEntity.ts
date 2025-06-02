import type { EstablishmentListItem } from '../establishment/EstablishmentEntity';

export type ChatType = {
	client: {
		first_name: string;
		last_name: string;
		phone: string | null;
	};

	establishment: EstablishmentListItem;
	messages: [];
	id: string;
};

export type Message = {
	message: {
		id: string;
		content_type: 'text' | 'file' | 'exclusive_order';
		content: string;
		created_time: string;
		chat_id: string;
		sender_id: string;
	};
	data: object;
	is_system: boolean;
};

export type ChatListItem = {
	client: {
		first_name: string;
		last_name: string;
		phone: string | null;
	};

	establishment: EstablishmentListItem;
	id: string;
};

export type ChatPreparingViewType = {
	existing_chats: ChatListItem[];
	new_chats: EstablishmentListItem[];
};

export type ChatScope = 'profile' | 'dashboard';
