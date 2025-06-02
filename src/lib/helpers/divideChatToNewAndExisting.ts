import type {
	ChatListItem,
	ChatPreparingViewType,
	EstablishmentListItem,
} from '@business-entities';

export function divideChatToNewAndExisting(
	establishments: EstablishmentListItem[],
	chats: ChatListItem[],
): ChatPreparingViewType {
	const new_chats = establishments.filter(
		(item) => !chats.some((chat) => chat.establishment.id === item.id),
	);

	return { existing_chats: chats, new_chats };
}
