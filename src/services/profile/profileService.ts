'use server';

import { createFetchAction } from '@/common/actions/createFetchAction';
import { DTOEmptyCommonResponse } from '@/dto/dtoEmpty';
import { URL_ENTITIES, isSuccessResponse } from '@/lib';
import type { Session } from '@business-entities';
import {
	AXIOS_GET,
	AXIOS_PATCH,
	AXIOS_POST,
	type CommonDataStringResponse,
	type Params,
	type ProfileFormValues,
	clearSession,
	getSession,
	setSession,
} from '@common';
import type {
	ClientHistoryResponseModel,
	CredentialsUpdateRequestModel,
	CredentialsUpdateResponseModel,
	ProfileResponseModel,
	ProfileUpdateResponseModel,
} from './profileServiceTypes';

class ProfileService {
	static async getProfileInfo() {
		const response = await AXIOS_GET<ProfileResponseModel>({
			url: URL_ENTITIES.PROFILE,
		});

		return response;
	}

	static async getClientHistory(params: Params) {
		const response = await createFetchAction<ClientHistoryResponseModel>({
			endpoint: URL_ENTITIES.CARD_HISTORY,
			shouldBeAuthorized: true,
			revalidateTags: [URL_ENTITIES.CARD_HISTORY],
			params: { ...params, size: '20' },
		});

		return response;
	}
	static async updateProfile(payload: ProfileFormValues): Promise<ProfileUpdateResponseModel> {
		const response = await AXIOS_PATCH<ProfileUpdateResponseModel>({
			url: URL_ENTITIES.PROFILE,
			data: payload,
		});

		if (isSuccessResponse(response)) {
			const session = await getSession();

			if (!session) {
				return DTOEmptyCommonResponse();
			}

			const newSession: Session = {
				...session,
				user: {
					...session.user,
					...payload,
					avatar:
						typeof payload.avatar === 'string' ? payload.avatar : session.user.avatar,
				},
			};

			await setSession(newSession);
		}

		return response;
	}

	static async firstStepPhoneVerification() {
		const response = await AXIOS_POST<CommonDataStringResponse>({
			url: URL_ENTITIES.PHONE_PRE_VERIFY,
		});

		return response;
	}

	static async secondStepPhoneVerification(params: Params) {
		const response = await AXIOS_POST<CommonDataStringResponse>({
			url: URL_ENTITIES.VERIFY_PHONE,
			params,
		});

		return response;
	}

	static async updateCredentials(data: CredentialsUpdateRequestModel) {
		const response = await AXIOS_POST<CredentialsUpdateResponseModel>({
			url: URL_ENTITIES.UPDATE_CREDENTIALS,
			data,
		});

		if (isSuccessResponse(response)) {
			await clearSession();
		}

		return response;
	}
}

export const {
	firstStepPhoneVerification,
	secondStepPhoneVerification,
	getClientHistory,
	getProfileInfo,
	updateProfile,
	updateCredentials,
} = ProfileService;
