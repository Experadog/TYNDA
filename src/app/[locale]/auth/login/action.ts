'use server';

import {
    COOKIES,
    encryptData,
    parseISOStringToDate,
    sharedCookieConfig,
    URL_ENTITIES,
} from '@/lib';
import { Session } from '@business-entities';
import { AXIOS_POST, CommonResponse } from '@common';
import { cookies } from 'next/headers';

export async function login(request: RequestModel): Promise<ResponseModel> {
    const response = await AXIOS_POST<ResponseModel>({
        url: URL_ENTITIES.LOGIN,
        data: request,
    });

    const cookieStore = await cookies();

    if (response.code === 200) {
        const encryptedSessionData = encryptData(response.data);

        cookieStore.set(
            COOKIES.SESSION,
            encryptedSessionData,
            sharedCookieConfig(parseISOStringToDate(response.data.access_token_expire_time))
        );
    }

    return response;
}

export type RequestModel = { email: string; password: string };
type ResponseModel = CommonResponse<Session>;
