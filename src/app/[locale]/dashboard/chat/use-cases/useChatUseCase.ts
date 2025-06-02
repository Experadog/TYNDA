import { URL_ENTITIES } from '@/lib';
import { useChatWebSocket } from '@/providers/chat-webscoket/chat-webscoket-provider';
import { type ChatListRetrievalResponseModel, createChat } from '@/services';
import { type Params, createAction, revalidateByTags, useAsyncAction } from '@common';

type Props = {
	chatList: ChatListRetrievalResponseModel['data'];
};

export function useChatUseCase({ chatList }: Props) {
	const { reconnect } = useChatWebSocket();
	const { execute } = useAsyncAction<unknown, [Params]>({});

	const action = createAction({
		requestAction: createChat,
		onSuccess: () => {
			revalidateByTags([URL_ENTITIES.CHAT_MY]);
			reconnect();
		},
	});

	const onCreate = async (establishment_id: string) => {
		await execute(action, { establishment_id });
	};

	return { chatList, onCreate };
}

export type UseChatUseCaseType = ReturnType<typeof useChatUseCase>;
