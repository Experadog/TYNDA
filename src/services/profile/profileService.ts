'use server';

import { clearCookie } from '@/common/actions/clear-cookie';
import { createFetchAction } from '@/common/actions/createFetchAction';
import { COOKIES, URL_ENTITIES, encryptData, isSuccessResponse, parseISOStringToDate } from '@/lib';
import type { Session, User } from '@business-entities';
import {
	AXIOS_GET,
	AXIOS_PATCH,
	AXIOS_POST,
	type CommonDataStringResponse,
	type Params,
	getCookie,
	setCookie,
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

	static async updateProfile(payload: Partial<User>) {
		const response = await AXIOS_PATCH<ProfileUpdateResponseModel>({
			url: URL_ENTITIES.PROFILE,
			data: payload,
		});

		if (isSuccessResponse(response)) {
			const session = await getCookie<Session>(COOKIES.SESSION, true);

			if (!session) {
				return {
					code: 400,
					msg: '',
					data: '',
				};
			}

			const newSession: Session = {
				...session,
				user: { ...session?.user, ...payload },
			};

			setCookie(
				COOKIES.SESSION,
				encryptData(newSession),
				parseISOStringToDate(session.refresh_token_expire_time),
			);
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
			await clearCookie(COOKIES.SESSION);
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
