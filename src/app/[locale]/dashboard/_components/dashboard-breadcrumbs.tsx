'use client';

import { useViewModel } from '@/i18n/getTranslate';
import { usePathname } from '@/i18n/routing';
import { PAGES } from '@/lib';
import { createDynamicLabels } from '@/lib/helpers/createDynamicLabels';
import { useLocale } from '@/providers/locale/locale-provider';
import type { ChatListItem, EstablishmentListItem, Role } from '@business-entities';
import { usePrepareBreadCrumbs } from '@common';
import { ExtendedBreadCrumbs } from '@components';
import { useMemo } from 'react';
import { useChatContext } from '../chat/context/chat-context-provider';
import { useEstablishmentContext } from '../establishments/use-case/establishment-context-provider';
import { useRolesContext } from '../roles/context/roles-context-provider';

const DashboardBreadcrumbs = () => {
	const pathname = usePathname();
	const viewModel = useViewModel(['Shared']);
	const { locale } = useLocale();

	const {
		states: { establishments },
	} = useEstablishmentContext();

	const {
		states: { roles },
	} = useRolesContext();

	const { chatList } = useChatContext();

	const dynamicLabels = useMemo(() => {
		return createDynamicLabels<[EstablishmentListItem, Role, ChatListItem]>({
			async_pages: [
				{
					isAsyncData: true,
					data: establishments?.items || [],
					path: PAGES.ESTABLISHMENT,
					rules: ['id', `translates.${locale}.name`],
				},

				{
					isAsyncData: true,
					data: roles?.items || [],
					path: PAGES.ROLES,
					rules: ['id', `translates.${locale}.name`],
				},

				{
					isAsyncData: true,
					data: chatList?.items || [],
					path: PAGES.DASHBOARD_CHAT,
					rules: ['id', 'establishment.translates.ru.name'],
				},
			],
			static_pages: {
				viewModel,
				keys: ['permission_scopes'],
			},
		});
	}, [establishments?.items, roles?.items, chatList.items, locale, viewModel]);

	const breadCrumbs = usePrepareBreadCrumbs({
		pathname,
		customHomePath: PAGES.DASHBOARD,
		startIndex: 1,
		dynamicLabels,
	});

	return (
		<ExtendedBreadCrumbs paths={breadCrumbs.paths} home={breadCrumbs.home} hideSingle={true} />
	);
};

export default DashboardBreadcrumbs;
