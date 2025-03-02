import {
    COOKIES,
    decryptData,
    encryptData,
    parseISOStringToDate,
    sharedCookieDomain,
    URL_ENTITIES,
} from '@/lib';
import { Credentials, Session } from '@business-entities';
import { AXIOS_POST, CommonResponse } from '@common';
import { cookies } from 'next/headers';

export async function POST() {
    const refreshResponse = await AXIOS_POST<CommonResponse<Credentials>>({
        url: URL_ENTITIES.REFRESH_TOKEN,
    });

    console.log(refreshResponse, 'UPDATED FROM SERVER');

    if (refreshResponse.code !== 200 || !refreshResponse.data) {
        return new Response(JSON.stringify(encryptData({ code: 401 })), { status: 200 });
    }

    const headers = new Headers();
    const data = refreshResponse.data;

    const cookieStore = await cookies();

    const oldSession = cookieStore.get(COOKIES.SESSION)?.value;
    const decryptedOldSession = decryptData(oldSession || '') as Session;

    const newSession = { ...decryptedOldSession, ...data };
    console.log(newSession, 'NEW SESSION');
    const encryptedNewSession = encryptData(newSession);

    headers.append(
        'Set-Cookie',
        `${
            COOKIES.SESSION
        }=${encryptedNewSession}; Path=/; SameSite=Lax; Domain=${sharedCookieDomain}; Expires=${parseISOStringToDate(
            data.refresh_token_expire_time
        )}`
    );

    const response = new Response(JSON.stringify(encryptedNewSession), {
        status: 200,
        headers,
    });

    return response;
}
