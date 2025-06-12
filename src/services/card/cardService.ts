'use server';

import { createFetchAction } from '@/common/actions/createFetchAction';
import { URL_ENTITIES } from '@/lib';
import type { Params } from '@common';
import type {
	CardListRetrievalResponseModel,
	UserCardRetrievalResponseModel,
} from './cardServiceTypes';

class CardService {
	static async getCardList(params?: Params): Promise<CardListRetrievalResponseModel> {
		const response = await createFetchAction<CardListRetrievalResponseModel>({
			endpoint: URL_ENTITIES.CARD_ALL,
			shouldBeAuthorized: true,
			params,
		});

		return response;
	}

	static async getUserCard(): Promise<UserCardRetrievalResponseModel> {
		const response = await createFetchAction<UserCardRetrievalResponseModel>({
			endpoint: URL_ENTITIES.USER_CARD,
			shouldBeAuthorized: true,
		});

		return response;
	}
}

export const { getCardList, getUserCard } = CardService;
