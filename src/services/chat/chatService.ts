'use server';

import { createFetchAction } from '@/common/actions/createFetchAction';
import { PAGES, URL_ENTITIES, isSuccessResponse } from '@/lib';
import type { ChatListItem, ChatScope } from '@business-entities';
import { AXIOS_POST, type CommonResponse, type Params, forceRedirect } from '@common';
import type {
	ChatListRetrievalResponseModel,
	ChatRetrievalResponseModel,
} from './chatServiceTypes';

class ChatService {
	static async getUserChatList(params: Params): Promise<ChatListRetrievalResponseModel> {
		const response = await createFetchAction<ChatListRetrievalResponseModel>({
			endpoint: URL_ENTITIES.CHAT_MY,
			shouldBeAuthorized: true,
			revalidateTags: [URL_ENTITIES.CHAT_MY],
			params,
		});

		return response;
	}

	static async createChat(params: Params): Promise<CommonResponse<ChatListItem>> {
		const response = await AXIOS_POST<CommonResponse<ChatListItem>>({
			url: URL_ENTITIES.ESTABLISHMENT_CHAT,
			params,
		});

		return response;
	}

	static async getDetailedChat(
		params: Params,
		scope: ChatScope,
	): Promise<ChatRetrievalResponseModel> {
		const response = await createFetchAction<ChatRetrievalResponseModel>({
			endpoint: URL_ENTITIES.CHAT_DETAILED,
			postfix: [params?.chat_id || ''],
			shouldBeAuthorized: true,
			revalidateTags: [URL_ENTITIES.CHAT_DETAILED],
		});

		if (!isSuccessResponse(response)) {
			if (scope === 'profile') {
				await forceRedirect(PAGES.PROFILE_CHAT);
			} else if (scope === 'dashboard') {
				await forceRedirect(PAGES.DASHBOARD_CHAT);
			} else {
				await forceRedirect(PAGES.ESTABLISHMENT);
			}
		}

		return response;
	}

	static async getEstablishmentChatList(params: Params) {
		const response = await createFetchAction<ChatListRetrievalResponseModel>({
			endpoint: URL_ENTITIES.CHAT_ESTABLISHMENT,
			params,
			shouldBeAuthorized: true,
			revalidateTags: [URL_ENTITIES.CHAT_ESTABLISHMENT],
		});

		if (!isSuccessResponse(response)) {
			await forceRedirect(PAGES.ESTABLISHMENT);
		}

		return response;
	}
}

export const { getUserChatList, createChat, getDetailedChat, getEstablishmentChatList } =
	ChatService;
