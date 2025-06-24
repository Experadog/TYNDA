import { useViewModel } from '@/i18n/getTranslate';
import { type CardListRetrievalResponseModel, getCardList } from '@/services';
import { createCardSchema, usePagination } from '@common';
import { useCardModalUseCase } from './modal/useCardModalUseCase';
import { useCardUpdatingUseCase } from './stories/useCardUpdatingUseCase';
import { useCardTableUseCase } from './table/useCardTableUseCase';

type Props = {
	initialData: CardListRetrievalResponseModel['data'];
};

export function useCardUseCase({ initialData }: Props) {
	const viewModel = useViewModel(['Validation']);

	const pagination = usePagination({
		entity: 'card',
		fetchFn: getCardList,
		initialData,
	});

	const schema = createCardSchema(viewModel);

	const modal = useCardModalUseCase({ schema });

	const updating = useCardUpdatingUseCase({
		cardID: modal.card?.id,
		onCloseUpdatingModel: modal.onCloseUpdating,
	});

	const table = useCardTableUseCase({ onDelete: () => '', onUpdate: modal.onOpenUpdating });

	return { pagination, table, updating, schema, modal };
}

export type UseCardUseCaseType = ReturnType<typeof useCardUseCase>;
