'use server';

import { createFetchAction } from '@/common/actions/createFetchAction';
import { URL_ENTITIES, isSuccessResponse } from '@/lib';
import { AXIOS_POST, clearSession, setSession } from '@common';
import type {
	AccountActivationRequestModel,
	AccountActivationResponseModel,
	GoogleLoginRequestModel,
	GoogleLoginResponseModel,
	LoginRequestModel,
	LoginResponseModel,
	LogoutResponseModel,
	RegisterClientRequestModel,
	RegisterEstablisherRequestModel,
	RegisterResponseModel,
} from './authServiceTypes';

class AuthService {
	static async login(request: LoginRequestModel): Promise<LoginResponseModel> {
		const response = await AXIOS_POST<LoginResponseModel>({
			url: URL_ENTITIES.LOGIN,
			data: request,
		});

		if (isSuccessResponse(response)) {
			await setSession(response.data);
		}

		return response;
	}

	static async logout(): Promise<LogoutResponseModel> {
		const response = await AXIOS_POST<LogoutResponseModel>({
			url: URL_ENTITIES.LOGOUT,
		});

		if (isSuccessResponse(response)) {
			await clearSession();
		}

		return response;
	}

	static async sendAndLoginByGoogle({
		code,
		locale,
	}: GoogleLoginRequestModel): Promise<GoogleLoginResponseModel> {
		const response = await createFetchAction<GoogleLoginResponseModel>({
			endpoint: URL_ENTITIES.CALLBACK_GOOGLE,
			shouldBeAuthorized: false,
			params: {
				code,
				state: locale,
			},
		});

		if (isSuccessResponse(response)) {
			await setSession(response.data);
		}

		return response;
	}

	static async register(
		data: RegisterClientRequestModel | RegisterEstablisherRequestModel,
	): Promise<RegisterResponseModel> {
		const response = await AXIOS_POST<RegisterResponseModel>({
			url: URL_ENTITIES.REGISTER,
			data,
		});

		return response;
	}

	static async activateAccount(
		data: AccountActivationRequestModel,
	): Promise<AccountActivationResponseModel> {
		const response = AXIOS_POST<AccountActivationResponseModel>({
			url: URL_ENTITIES.ACTIVATE_ACCOUNT,
			params: data,
		});

		return response;
	}
}

export const { login, logout, activateAccount, register, sendAndLoginByGoogle } = AuthService;
