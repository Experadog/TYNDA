import { useRouter } from '@/i18n/routing';
import { PAGES, URL_ENTITIES } from '@/lib';
import { useChatWebSocket } from '@/providers/chat-webscoket/chat-webscoket-provider';
import { createChat } from '@/services';
import type { ChatScope } from '@business-entities';
import { type Params, createAction, revalidateByTags, useAsyncAction } from '@common';

export function useChatUseCase() {
	const { reconnect } = useChatWebSocket();
	const { execute } = useAsyncAction<unknown, [Params, ChatScope]>({});
	const router = useRouter();

	const action = createAction({
		requestAction: createChat,
		onSuccess: async (res) => {
			await revalidateByTags([URL_ENTITIES.CHAT_MY]);
			reconnect();
			router.push(`${PAGES.PROFILE_CHAT}/${res.data.id}`);
		},
	});

	const onCreate = async (establishment_id: string) => {
		await execute(action, { establishment_id }, 'profile');
	};

	return { onCreate };
}
