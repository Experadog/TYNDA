'use server';

import {
    COOKIES,
    encryptData,
    parseISOStringToDate,
    sharedCookieConfig,
    URL_ENTITIES,
} from '@/lib';
import { AXIOS_POST, CommonResponse } from '@common';
import { cookies } from 'next/headers';
import { LoginRequestModel, LoginResponseModel } from './authServiceTypes';

class AuthService {
    static async login(request: LoginRequestModel): Promise<LoginResponseModel> {
        const response = await AXIOS_POST<LoginResponseModel>({
            url: URL_ENTITIES.LOGIN,
            data: request,
        });

        const cookieStore = await cookies();

        if (response.code === 200) {
            const encryptedSessionData = encryptData(response.data);
            cookieStore.set(
                COOKIES.SESSION,
                encryptedSessionData,
                sharedCookieConfig(parseISOStringToDate(response.data.refresh_token_expire_time))
            );
        }

        return response;
    }

    static async logout(): Promise<CommonResponse<null>> {
        const response = await AXIOS_POST<CommonResponse<null>>({
            url: URL_ENTITIES.LOGOUT,
        });
        const cookieStore = await cookies();

        if (response.code === 200) {
            cookieStore.set(COOKIES.SESSION, '', sharedCookieConfig());
        }

        return response;
    }
}

export const login = AuthService.login;
export const logout = AuthService.logout;
