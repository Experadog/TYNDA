import { useViewModel } from '@/i18n/getTranslate';
import { URL_ENTITIES } from '@/lib';
import {
	type TariffCreationRequestModel,
	type TariffCreationResponseModel,
	createTariff,
} from '@/services';
import { createAction, revalidateByTags, useAsyncAction } from '@common';

export function useTariffCreationUseCase({ closeModal }: { closeModal: () => void }) {
	const { TariffCreation } = useViewModel(['Toast']);
	const { execute } = useAsyncAction<TariffCreationResponseModel, [TariffCreationRequestModel]>({
		messages: TariffCreation,
	});

	const action = createAction({
		requestAction: createTariff,
		onSuccess: async () => {
			await revalidateByTags([URL_ENTITIES.TARIFF_ALL]);
			closeModal();
		},
	});

	const onCreate = async (values: TariffCreationRequestModel) => {
		await execute(action, values);
	};

	return { onCreate };
}
