import { COOKIES } from '@/lib';

export async function POST() {
    const headers = new Headers();

    headers.append(
        'Set-Cookie',
        `${COOKIES.SESSION}=''; HttpOnly; Path=/; SameSite=Lax; Secure; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    );

    const response = new Response(JSON.stringify({ code: 200 }), { headers, status: 200 });

    return response;
}
