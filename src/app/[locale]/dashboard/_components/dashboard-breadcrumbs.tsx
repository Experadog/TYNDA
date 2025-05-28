'use client';

import { useViewModel } from '@/i18n/getTranslate';
import { usePathname } from '@/i18n/routing';
import { PAGES } from '@/lib';
import { createDynamicLabels } from '@/lib/helpers/createDynamicLabels';
import { useLocale } from '@/providers/locale/locale-provider';
import type { EstablishmentListItem, Role } from '@business-entities';
import { usePrepareBreadCrumbs } from '@common';
import { ExtendedBreadCrumbs } from '@components';
import { useMemo } from 'react';
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

	const dynamicLabels = useMemo(() => {
		return createDynamicLabels<[EstablishmentListItem, Role]>({
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
			],
			static_pages: {
				viewModel,
				keys: ['permission_scopes'],
			},
		});
	}, [establishments?.items, roles?.items, locale, viewModel]);

	const breadCrumbs = usePrepareBreadCrumbs({
		pathname,
		customHomePath: PAGES.DASHBOARD,
		startIndex: 1,
		dynamicLabels,
	});

	console.log(breadCrumbs);

	return (
		<ExtendedBreadCrumbs paths={breadCrumbs.paths} home={breadCrumbs.home} hideSingle={true} />
	);
};

export default DashboardBreadcrumbs;
