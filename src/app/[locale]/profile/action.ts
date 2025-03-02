'use server';

import { COOKIES, sharedCookieConfig, URL_ENTITIES } from '@/lib';
import { AXIOS_POST, CommonResponse } from '@common';
import { cookies } from 'next/headers';

export async function logout(request: RequestModel): Promise<ResponseModel> {
    const response = await AXIOS_POST<CommonResponse<null>>({
        url: URL_ENTITIES.LOGOUT,
    });
    const cookieStore = await cookies();

    if (response.code === 200) {
        cookieStore.set(COOKIES.SESSION, '', sharedCookieConfig());
    }

    return response;
}

type ResponseModel = CommonResponse<null>;
type RequestModel = void;
