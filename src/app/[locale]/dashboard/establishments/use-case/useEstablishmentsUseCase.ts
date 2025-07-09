'use client';

import { useViewModel } from '@/i18n/getTranslate';
import type { EstablishmentClientRetrievalResponseModel } from '@/services';
import { useRetrievalUseCase } from './stories/useRetrievalUseCase';

type Props = {
	establishments: EstablishmentClientRetrievalResponseModel['data'];
};

export function useEstablishmentUseCase({ establishments }: Props) {
	const viewModel = useViewModel(['Validation', 'Toast', 'Shared', 'CommonToast']);
	const pagination = useRetrievalUseCase(establishments);

	return { pagination, viewModel };
}

export type UseEstablishmentUseCaseType = ReturnType<typeof useEstablishmentUseCase>;
