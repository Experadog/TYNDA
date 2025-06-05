'use client';
import { useViewModel } from '@/i18n/getTranslate';
import { SEARCH_PARAMS } from '@/lib';
import { type GetEstablishmentAllClientResponseModel, getEstablishmentAllClient } from '@/services';
import type { EstablishmentCategory } from '@business-entities';
import { usePagination } from '@common';
import { useSearchParams } from 'next/navigation';

type Props = {
	initialData: GetEstablishmentAllClientResponseModel['data'];
};

export function useAllEnterprisesUseCase({ initialData }: Props) {
	const viewModel = useViewModel(['AllEnterprises']);

	const searchParams = useSearchParams();
	const category = searchParams.get(SEARCH_PARAMS.category.key) as EstablishmentCategory;

	const pagination = usePagination({
		entity: 'establishment',
		fetchFn: getEstablishmentAllClient,
		initialData,
		params: { category },
		keys: [category],
	});

	return { viewModel, pagination };
}
