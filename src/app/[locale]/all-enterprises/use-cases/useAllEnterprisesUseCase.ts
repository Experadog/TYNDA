'use client';
import { useViewModel } from '@/i18n/getTranslate';
import { type GetEstablishmentAllClientResponseModel, getEstablishmentAllClient } from '@/services';
import { type Params, usePagination } from '@common';

type Props = {
	initialData: GetEstablishmentAllClientResponseModel['data'];
	params: Params;
};

export function useAllEnterprisesUseCase({ initialData, params }: Props) {
	const viewModel = useViewModel(['AllEnterprises', 'Shared']);

	const pagination = usePagination({
		entity: 'establishment',
		fetchFn: getEstablishmentAllClient,
		params,
		initialData,
		keys: [JSON.stringify(params)],
	});

	return { viewModel, pagination };
}
