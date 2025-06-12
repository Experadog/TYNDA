import { useViewModel } from '@/i18n/getTranslate';
import { URL_ENTITIES } from '@/lib';
import {
	type TariffUpdatingRequestModel,
	type TariffUpdatingResponseModel,
	updateTariff,
} from '@/services';
import { type TariffFormValues, createAction, revalidateByTags, useAsyncAction } from '@common';

export function useTariffUpdatingUseCase({ closeModal }: { closeModal: () => void }) {
	const { TariffUpdating } = useViewModel(['Toast']);
	const { execute } = useAsyncAction<TariffUpdatingResponseModel, [TariffUpdatingRequestModel]>({
		messages: TariffUpdating,
	});

	const action = createAction({
		requestAction: updateTariff,
		onSuccess: async () => {
			await revalidateByTags([URL_ENTITIES.TARIFF_ALL]);
			closeModal();
		},
	});

	const onUpdate = async (values: TariffFormValues, id: string) => {
		const requestData: TariffUpdatingRequestModel = {
			payload: values,
			id,
		};

		await execute(action, requestData);
	};

	return { onUpdate };
}
