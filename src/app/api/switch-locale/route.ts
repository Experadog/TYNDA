import { COOKIES, sharedCookieConfig } from '@/lib';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    const body = await request.json();

    const cookieStore = await cookies();

    cookieStore.set(COOKIES.NEXT_LOCALE, body.locale, sharedCookieConfig());

    return new Response(JSON.stringify({ code: 200 }), { status: 200 });
}
