import { useViewModel } from '@/i18n/getTranslate';
import { useRouter } from '@/i18n/routing';
import { PAGES, URL_ENTITIES } from '@/lib';
import { useChatWebSocket } from '@/providers/chat-webscoket/chat-webscoket-provider';
import {
	type ChatCreationResponseModel,
	type EstablishmentClientRetrievalResponseModel,
	createChat,
	getEstablishmentAllClient,
} from '@/services';
import type { ChatScope } from '@business-entities';
import {
	type Params,
	createAction,
	revalidateByTags,
	useAsyncAction,
	usePagination,
	useSearch,
} from '@common';
import { useState } from 'react';

type Props = {
	establishments?: EstablishmentClientRetrievalResponseModel['data'];
	scope: ChatScope;
};

export function useChatCreationUseCase({ establishments, scope }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const { connectWebSocket } = useChatWebSocket();
	const router = useRouter();
	const { ChatCreation } = useViewModel(['Toast']);

	const { execute, isLoading: isChatCreating } = useAsyncAction<
		ChatCreationResponseModel,
		[Params]
	>({ messages: ChatCreation });

	const commonPath = scope === 'dashboard' ? PAGES.DASHBOARD_CHAT : PAGES.PROFILE_CHAT;

	const search = useSearch({
		entity: 'establishment',
		searchFn: getEstablishmentAllClient,
		initialData: establishments,
	});

	const pagination = usePagination({
		entity: 'establishment',
		fetchFn: getEstablishmentAllClient,
		initialData: search.data,
	});

	const action = createAction({
		requestAction: createChat,
		onSuccess: async (res) => {
			onClose();
			await revalidateByTags([URL_ENTITIES.CHAT_MY]);
			connectWebSocket();
			router.push(`${commonPath}/${res.data.id}`);
		},
	});

	const onClose = () => {
		setIsOpen(false);
		search.onChange('');
	};

	const onOpen = () => {
		setIsOpen(true);
	};

	const onCreateChat = async (establishment_id: string) => {
		await execute(action, { establishment_id });
	};

	const actions = {
		onClose,
		onOpen,
		onCreateChat,
	};

	const states = {
		pagination,
		search,
		isOpen,
		isChatCreating,
	};

	return { actions, states };
}
