import { usePathname } from '@/i18n/routing';
import { PAGES } from '@/lib';
import { createDynamicLabels } from '@/lib/helpers/createDynamicLabels';
import { useLocale } from '@/providers/locale/locale-provider';
import { useUser } from '@/providers/user/user-provider';
import { type UsedEstablisherWorkerEntities, usePrepareBreadCrumbs } from '@common';
import { ExtendedBreadCrumbs } from '@components';
import { useMemo } from 'react';

const EstablishmentWorkerBreadCrumbs = () => {
	const pathname = usePathname();
	const { locale } = useLocale();

	const { user } = useUser();

	const dynamicLabels = useMemo(
		() =>
			createDynamicLabels<UsedEstablisherWorkerEntities>({
				async_pages: [
					{
						isAsyncData: true,
						data: user?.staff_establishment ? [user.staff_establishment] : [],
						path: PAGES.STAFF_ESTABLISHMENT,
						rules: ['id', `translates.${locale}.name`],
					},
				],
			}),
		[user?.staff_establishment, locale],
	);

	const breadCrumbs = usePrepareBreadCrumbs({
		pathname,
		customHomePath: PAGES.DASHBOARD,
		startIndex: 1,
	});

	return (
		<ExtendedBreadCrumbs paths={breadCrumbs.paths} home={breadCrumbs.home} hideSingle={true} />
	);
};

export default EstablishmentWorkerBreadCrumbs;
