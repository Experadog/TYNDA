import { COOKIES } from '@/lib/constants';

export async function POST(request: Request) {
    const body = await request.json();

    const headers = new Headers();

    headers.append(
        'Set-Cookie',
        `${COOKIES.NEXT_LOCALE}=${body.locale}; HttpOnly; Path=/; SameSite=Strict; Secure`
    );

    const response = new Response(JSON.stringify({ code: 200 }), { headers });

    return response;
}
