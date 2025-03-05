import { COOKIES } from '@/lib';
import { cookies } from 'next/headers';

export async function POST() {
    const cookieStore = await cookies();

    cookieStore.delete(COOKIES.SESSION);

    const response = new Response(JSON.stringify({ code: 200 }), { status: 200 });

    return response;
}
