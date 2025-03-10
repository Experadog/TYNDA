'use server';

import { COOKIES, defaultCookieConfig, encryptData, isSuccessResponse, parseISOStringToDate, URL_ENTITIES } from '@/lib';
import { AXIOS_GET, AXIOS_POST, CommonResponse } from '@common';
import { cookies } from 'next/headers';
import { GoogleLoginRequestModel, GoogleLoginResponseModel, LoginRequestModel, LoginResponseModel } from './authServiceTypes';

class AuthService {
    static async login(request: LoginRequestModel): Promise<LoginResponseModel> {
        const response = await AXIOS_POST<LoginResponseModel>({
            url: URL_ENTITIES.LOGIN,
            data: request,
        });

        const cookieStore = await cookies();

        if (isSuccessResponse(response)) {
            const encryptedSessionData = encryptData(response.data);
            cookieStore.set(COOKIES.SESSION, encryptedSessionData, defaultCookieConfig(parseISOStringToDate(response.data.refresh_token_expire_time)));
        }

        return response;
    }

    static async logout(): Promise<CommonResponse<null>> {
        const response = await AXIOS_POST<CommonResponse<null>>({
            url: URL_ENTITIES.LOGOUT,
        });
        const cookieStore = await cookies();

        if (isSuccessResponse(response)) {
            cookieStore.set(COOKIES.SESSION, '', defaultCookieConfig());
        }

        return response;
    }

    static async sendAndLoginByGoogle({ code, role, locale }: GoogleLoginRequestModel): Promise<GoogleLoginResponseModel> {
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
            cookieStore.set(COOKIES.SESSION, encryptedSessionData, defaultCookieConfig(parseISOStringToDate(response.data.refresh_token_expire_time)));
        }

        return response;
    }
}

export const login = AuthService.login;
export const logout = AuthService.logout;
export const sendAndLoginByGoogle = AuthService.sendAndLoginByGoogle;
