import { usePathname } from '@/i18n/routing';
import { PAGES } from '@/lib';
import { createDynamicLabels } from '@/lib/helpers/createDynamicLabels';
import { useLocale } from '@/providers/locale/locale-provider';
import { type UsedEstablisherEntities, usePrepareBreadCrumbs } from '@common';
import { ExtendedBreadCrumbs } from '@components';
import { useMemo } from 'react';
import { useChatContext } from '../../chat/context/chat-context-provider';
import { useEstablishmentContext } from '../../establishments/use-case/establishment-context-provider';

const EstablisherBreadCrumbs = () => {
	const pathname = usePathname();

	const { locale } = useLocale();

	const {
		pagination: {
			states: { list },
		},
	} = useEstablishmentContext();

	const { establishmentChats, chatList } = useChatContext();

	const dynamicLabels = useMemo(
		() =>
			createDynamicLabels<UsedEstablisherEntities>({
				async_pages: [
					{
						isAsyncData: true,
						data: list || [],
						path: PAGES.ESTABLISHMENT,
						rules: ['id', `translates.${locale}.name`],
					},

					{
						isAsyncData: true,
						data: [...establishmentChats.items, ...chatList.items],
						path: PAGES.CHAT,
						rules: ['id', 'client.first_name'],
					},
				],
			}),
		[list, chatList.items, establishmentChats.items, locale],
	);

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

export default EstablisherBreadCrumbs;
