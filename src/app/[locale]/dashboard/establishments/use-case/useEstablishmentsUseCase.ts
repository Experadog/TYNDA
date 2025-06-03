'use client';

import { useViewModel } from '@/i18n/getTranslate';
import type { GetEstablishmentAllClientResponseModel } from '@/services';
import { useRetrievalUseCase } from './stories/useRetrievalUseCase';

type Props = {
	establishments: GetEstablishmentAllClientResponseModel;
};

export function useEstablishmentUseCase({ establishments }: Props) {
	const viewModel = useViewModel(['Validation', 'Toast', 'Shared']);
	const pagination = useRetrievalUseCase(establishments.data);

	return { pagination, viewModel };
}

export type UseEstablishmentUseCaseType = ReturnType<typeof useEstablishmentUseCase>;
