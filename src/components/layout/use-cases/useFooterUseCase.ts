'use client';
import { useViewModel } from '@/i18n/getTranslate';
import { PAGES } from '@/lib';

export function useFooterUseCase() {
	const viewModel = useViewModel(['Layout']);

	const pageSectionUrls: PAGES[] = [PAGES.HOME, PAGES.ABOUT, PAGES.CONTACTS, PAGES.SERVICE];
	const payloadSectionUrls: PAGES[] = [PAGES.ABOUT, PAGES.CONTACTS];
	const authSectionUrls: PAGES[] = [PAGES.LOGIN, PAGES.REGISTER];

	const sectionUrls = [pageSectionUrls, payloadSectionUrls, authSectionUrls];

	return { viewModel, sectionUrls };
}
