import { URL_ENTITIES } from '@/lib';
import { useChatWebSocket } from '@/providers/chat-webscoket/chat-webscoket-provider';
import { createChat } from '@/services';
import { type Params, createAction, revalidateByTags, useAsyncAction } from '@common';

export function useChatUseCase() {
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

	return { onCreate };
}
