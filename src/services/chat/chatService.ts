'use server';

import { createFetchAction } from '@/common/actions/createFetchAction';
import { PAGES, URL_ENTITIES, isSuccessResponse } from '@/lib';
import type { ChatScope } from '@business-entities';
import { AXIOS_POST, type Params, forceRedirect } from '@common';
import type {
	ChatListRetrievalResponseModel,
	ChatRetrievalResponseModel,
} from './chatServiceTypes';

class ChatService {
	static async getChatList(): Promise<ChatListRetrievalResponseModel> {
		const response = await createFetchAction<ChatListRetrievalResponseModel>({
			endpoint: URL_ENTITIES.CHAT_MY,
			shouldBeAuthorized: true,
			revalidateTags: [URL_ENTITIES.CHAT_MY],
			params: { page: '1', size: '20' },
		});

		return response;
	}

	static async createChat(params: Params) {
		const response = await AXIOS_POST({
			url: URL_ENTITIES.CHAT,
			params,
		});

		return response;
	}

	static async getChats(params: Params): Promise<ChatListRetrievalResponseModel> {
		const response = await createFetchAction<ChatListRetrievalResponseModel>({
			endpoint: URL_ENTITIES.CHAT,
			params,
			shouldBeAuthorized: true,
		});

		return response;
	}

	static async getDetailedChat(
		params: Params,
		scope: ChatScope,
	): Promise<ChatRetrievalResponseModel> {
		const response = await createFetchAction<ChatRetrievalResponseModel>({
			endpoint: URL_ENTITIES.CHAT,
			postfix: [params?.chat_id || ''],
			shouldBeAuthorized: true,
		});

		if (!isSuccessResponse(response)) {
			if (scope === 'profile') {
				await forceRedirect(PAGES.PROFILE_CHAT);
			} else {
				await forceRedirect(PAGES.DASHBOARD_CHAT);
			}
		}

		return response;
	}

	static async getEstablishmentChat(params: Params) {
		const response = await createFetchAction<ChatRetrievalResponseModel>({
			endpoint: URL_ENTITIES.CHAT_ESTABLISHMENT,
			params,
			shouldBeAuthorized: true,
		});

		// console.log(response);

		// if (!isSuccessResponse(response)) {
		// await forceRedirect(PAGES.DASHBOARD_CHAT);
		// }

		return response;
	}
}

export const { getChatList, createChat, getDetailedChat, getEstablishmentChat, getChats } =
	ChatService;
