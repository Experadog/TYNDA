import { useViewModel } from '@/i18n/getTranslate';
import { URL_ENTITIES } from '@/lib';
import { type TariffDeletionResponseModel, deleteTariff } from '@/services';
import { type Params, createAction, revalidateByTags, useAsyncAction } from '@common';

export function useTariffDeletionUseCase({ closeModal }: { closeModal: () => void }) {
	const { TariffDeletion } = useViewModel(['Toast']);

	const { execute } = useAsyncAction<TariffDeletionResponseModel, [Params]>({
		messages: TariffDeletion,
	});

	const action = createAction({
		requestAction: deleteTariff,
		onSuccess: async () => {
			await revalidateByTags([URL_ENTITIES.TARIFF_ALL]);
			closeModal();
		},
	});

	const onDelete = async (id: string) => {
		await execute(action, { id });
	};

	return { onDelete };
}
