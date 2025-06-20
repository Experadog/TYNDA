'use client';

import { useViewModel } from '@/i18n/getTranslate';
import type { GetEstablishmentAllClientResponseModel } from '@/services';
import { useRetrievalUseCase } from './stories/useRetrievalUseCase';

type Props = {
	establishments: GetEstablishmentAllClientResponseModel['data'];
};

export function useEstablishmentUseCase({ establishments }: Props) {
	const viewModel = useViewModel(['Validation', 'Toast', 'Shared', 'CommonToast']);
	const pagination = useRetrievalUseCase(establishments);

	return { pagination, viewModel };
}

export type UseEstablishmentUseCaseType = ReturnType<typeof useEstablishmentUseCase>;
