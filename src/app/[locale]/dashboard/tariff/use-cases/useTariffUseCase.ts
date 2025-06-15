import { useViewModel } from '@/i18n/getTranslate';
import { type TariffListRetrievalResponseModel, getTariffList } from '@/services';
import { createTariffSchema, usePagination } from '@common';
import { useTariffActionModalUseCase } from './modal/useTariffActionModalUseCase';
import { useTariffCreationUseCase } from './stories/useTariffCreationUseCase';
import { useTariffDeletionUseCase } from './stories/useTariffDeletionUseCase';
import { useTariffUpdatingUseCase } from './stories/useTariffUpdatingUseCase';
import { useTariffTableUseCase } from './table/useTariffTableUseCase';

type Props = {
	tariffsResponse?: TariffListRetrievalResponseModel['data'];
};

export function useTariffUserCase({ tariffsResponse }: Props) {
	const pagination = usePagination({
		entity: 'tariff',
		fetchFn: getTariffList,
		initialData: tariffsResponse,
	});

	const viewModel = useViewModel(['Validation']);

	const schema = createTariffSchema(viewModel);
	const modal = useTariffActionModalUseCase({ schema });

	const creation = useTariffCreationUseCase({ closeModal: modal.onClose });
	const deletion = useTariffDeletionUseCase({ closeModal: modal.onCloseDeletionModal });
	const updating = useTariffUpdatingUseCase({
		closeModal: modal.onClose,
	});

	const table = useTariffTableUseCase({
		onMutate: modal.onOpen,
		onDelete: modal.onOpenDeletionModal,
	});

	return { pagination, table, modal, schema, creation, deletion, updating };
}

export type UseTariffUseCaseType = ReturnType<typeof useTariffUserCase>;
