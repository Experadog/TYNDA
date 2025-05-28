'use server';

import { clearCookie } from '@/common/actions/clear-cookie';
import {
	COOKIES,
	URL_ENTITIES,
	defaultCookieConfig,
	encryptData,
	isSuccessResponse,
	parseISOStringToDate,
} from '@/lib';
import { AXIOS_GET, AXIOS_POST, type CommonResponse } from '@common';
import { cookies } from 'next/headers';
import type {
	AccountActivationRequestModel,
	AccountActivationResponseModel,
	GoogleLoginRequestModel,
	GoogleLoginResponseModel,
	LoginRequestModel,
	LoginResponseModel,
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

		const cookieStore = await cookies();

		if (isSuccessResponse(response)) {
			const encryptedSessionData = encryptData(response.data);

			cookieStore.set(
				COOKIES.SESSION,
				encryptedSessionData,
				defaultCookieConfig(parseISOStringToDate(response.data.refresh_token_expire_time)),
			);
		}

		return response;
	}

	static async logout(): Promise<CommonResponse<null>> {
		const response = await AXIOS_POST<CommonResponse<null>>({
			url: URL_ENTITIES.LOGOUT,
		});

		if (isSuccessResponse(response)) {
			await clearCookie(COOKIES.SESSION);
		}

		return response;
	}

	static async sendAndLoginByGoogle({
		code,
		role,
		locale,
	}: GoogleLoginRequestModel): Promise<GoogleLoginResponseModel> {
		const response = await AXIOS_GET<GoogleLoginResponseModel>({
			url: URL_ENTITIES.CALLBACK_GOOGLE,
			params: {
				code,
				role,
				state: locale,
			},
		});

		if (isSuccessResponse(response)) {
			const cookieStore = await cookies();
			const encryptedSessionData = encryptData(response.data);
			cookieStore.set(
				COOKIES.SESSION,
				encryptedSessionData,
				defaultCookieConfig(parseISOStringToDate(response.data.refresh_token_expire_time)),
			);
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
