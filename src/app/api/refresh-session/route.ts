import {
    COOKIES,
    decryptData,
    encryptData,
    parseISOStringToDate,
    REFRESH_INTERVAL_GUARD,
    sharedCookieConfig,
    URL_ENTITIES,
} from '@/lib';
import { Credentials, Session } from '@business-entities';
import { AXIOS_POST, CommonResponse } from '@common';
import { cookies } from 'next/headers';

export async function POST() {
    const cookieStore = await cookies();
    const oldSession = cookieStore.get(COOKIES.SESSION)?.value;
    const decryptedOldSession = decryptData(oldSession || '') as Session | null;

    if (!decryptedOldSession) {
        return new Response(JSON.stringify(encryptData({ code: 401 })), { status: 200 });
    }

    if (
        decryptedOldSession?.last_refreshed &&
        Date.now() - decryptedOldSession.last_refreshed < REFRESH_INTERVAL_GUARD
    ) {
        return new Response(JSON.stringify(oldSession), {
            status: 200,
        });
    }

    const res = await AXIOS_POST<CommonResponse<Credentials>>({ url: URL_ENTITIES.REFRESH_TOKEN });

    if (res.code !== 200) {
        return new Response(JSON.stringify(encryptData({ code: 200 })), { status: 200 });
    }

    const data = res?.data;

    const newSession: Session = {
        ...decryptedOldSession,
        ...data,
        last_refreshed: Date.now(),
    };

    const encryptedNewSession = encryptData(newSession);

    cookieStore.set(
        COOKIES.SESSION,
        encryptedNewSession,
        sharedCookieConfig(parseISOStringToDate(newSession.refresh_token_expire_time))
    );

    const response = new Response(JSON.stringify(encryptedNewSession), {
        status: 200,
    });

    return response;
}
