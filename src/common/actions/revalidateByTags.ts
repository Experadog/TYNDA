'use server';

import { URL_ENTITIES } from '@/lib';
import { revalidateTag } from 'next/cache';

export async function revalidateByTags(tags: URL_ENTITIES[]) {
    tags.forEach((tag) => revalidateTag(tag));
}
