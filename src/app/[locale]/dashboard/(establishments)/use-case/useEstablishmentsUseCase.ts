import { useViewModel } from '@/i18n/getTranslate';
import { createEstablishmentSchema } from '@common';
import { useImageUploadingUseCase } from './useImageUploadingUseCase';

export function useEstablishmentUseCase() {
	const viewModel = useViewModel(['Validation']);

	const imageUploadUseCase = useImageUploadingUseCase();

	const schema = createEstablishmentSchema(viewModel);

	const states = { schema };
	const sharedUseCases = { imageUploadUseCase };

	return { states, sharedUseCases };
}

export type UseEstablishmentUseCaseType = ReturnType<typeof useEstablishmentUseCase>;
