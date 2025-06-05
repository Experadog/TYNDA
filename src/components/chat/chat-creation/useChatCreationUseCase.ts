import { useRouter } from '@/i18n/routing';
import { PAGES, URL_ENTITIES } from '@/lib';
import { useChatWebSocket } from '@/providers/chat-webscoket/chat-webscoket-provider';
import {
	type GetEstablishmentAllClientResponseModel,
	createChat,
	getEstablishmentAllClient,
} from '@/services';
import type { ChatScope } from '@business-entities';
import { createAction, revalidateByTags, usePagination, useSearch } from '@common';
import { useState } from 'react';

type Props = {
	establishments?: GetEstablishmentAllClientResponseModel['data'];
	scope: ChatScope;
};

export function useChatCreationUseCase({ establishments, scope }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const { connectWebSocket } = useChatWebSocket();
	const router = useRouter();

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
		await action({ establishment_id });
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
	};

	return { actions, states };
}
