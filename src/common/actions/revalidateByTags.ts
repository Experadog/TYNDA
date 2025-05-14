'use server';

import type { URL_ENTITIES } from '@/lib';
import { revalidateTag } from 'next/cache';

export async function revalidateByTags(tags: URL_ENTITIES[]) {
	for (const tag of tags) {
		revalidateTag(tag);
	}
}
