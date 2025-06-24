'use server';

import { createFetchAction } from '@/common/actions/createFetchAction';
import { URL_ENTITIES } from '@/lib';
import { AXIOS_PATCH, type Params } from '@common';
import type {
	CardListRetrievalResponseModel,
	CardUpdatingRequestModel,
	CardUpdatingResponseModel,
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

	static async updateCard({
		cardID,
		payload,
	}: CardUpdatingRequestModel): Promise<CardUpdatingResponseModel> {
		const response = await AXIOS_PATCH<CardUpdatingResponseModel>({
			url: URL_ENTITIES.CARD,
			data: payload,
			params: { id: cardID },
		});

		return response;
	}
}

export const { getCardList, getUserCard, updateCard } = CardService;
