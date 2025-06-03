import { useRouter } from '@/i18n/routing';
import { PAGES, URL_ENTITIES } from '@/lib';
import { useChatWebSocket } from '@/providers/chat-webscoket/chat-webscoket-provider';
import { type ChatListRetrievalResponseModel, createChat } from '@/services';
import type { ChatScope } from '@business-entities';
import { type Params, createAction, revalidateByTags, useAsyncAction } from '@common';
import { useState } from 'react';

type Props = {
	chatList: ChatListRetrievalResponseModel['data'];
};

export function useChatUseCase({ chatList }: Props) {
	const [data, setData] = useState(chatList);

	const { reconnect } = useChatWebSocket();
	const { execute } = useAsyncAction<unknown, [Params, ChatScope]>({});
	const router = useRouter();

	const action = createAction({
		requestAction: createChat,
		onSuccess: (res) => {
			revalidateByTags([URL_ENTITIES.CHAT_MY]);
			reconnect();
			router.push(`${PAGES.DASHBOARD_CHAT}/${res.data.id}`);
		},
	});

	const onCreate = async (establishment_id: string) => {
		await execute(action, { establishment_id }, 'dashboard');
	};

	return { chatList: data, onCreate, setData };
}

export type UseChatUseCaseType = ReturnType<typeof useChatUseCase>;
