'use client';

import { useViewModel } from '@/i18n/getTranslate';
import type { GetEstablishmentAllClientResponseModel } from '@/services';

type Props = {
	establishments: GetEstablishmentAllClientResponseModel;
};

export function useEstablishmentUseCase({ establishments }: Props) {
	const viewModel = useViewModel(['Validation', 'Toast', 'Shared']);
	const data = establishments?.data;

	const states = { viewModel, establishments: data };
	const actions = {};

	return { states, actions };
}

export type UseEstablishmentUseCaseType = ReturnType<typeof useEstablishmentUseCase>;
