import { useViewModel } from '@/i18n/getTranslate';
import {
	type CardListRetrievalResponseModel,
	type TariffListRetrievalResponseModel,
	getCardList,
	getTariffList,
} from '@/services';
import { createTariffSchema, usePagination } from '@common';
import { useTariffActionModalUseCase } from './modal/useTariffActionModalUseCase';
import { useTariffCreationUseCase } from './stories/useTariffCreationUseCase';
import { useTariffDeletionUseCase } from './stories/useTariffDeletionUseCase';
import { useTariffUpdatingUseCase } from './stories/useTariffUpdatingUseCase';
import { useTariffTableUseCase } from './table/useTariffTableUseCase';

type Props = {
	cardsResponse?: CardListRetrievalResponseModel['data'];
	tariffsResponse?: TariffListRetrievalResponseModel['data'];
};

export function useTariffUserCase({ cardsResponse, tariffsResponse }: Props) {
	const tariffPagination = usePagination({
		entity: 'tariff',
		fetchFn: getTariffList,
		initialData: tariffsResponse,
	});

	const cardPagination = usePagination({
		entity: 'card',
		fetchFn: getCardList,
		initialData: cardsResponse,
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

	return { tariffPagination, cardPagination, table, modal, schema, creation, deletion, updating };
}

export type UseTariffUseCaseType = ReturnType<typeof useTariffUserCase>;
