import type { ChatListRetrievalResponseModel } from '@/services';
import { useState } from 'react';

type Props = {
	chatList: ChatListRetrievalResponseModel['data'];
};

export function useChatUseCase({ chatList }: Props) {
	const [establishmentChats, setEstablishmentChats] = useState(chatList);

	return { chatList, setEstablishmentChats, establishmentChats };
}

export type UseChatUseCaseType = ReturnType<typeof useChatUseCase>;
