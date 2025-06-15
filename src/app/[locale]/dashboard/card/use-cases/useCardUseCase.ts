import { type CardListRetrievalResponseModel, getCardList } from '@/services';
import { usePagination } from '@common';
import { useCardTableUseCase } from './table/useCardTableUseCase';

type Props = {
	initialData: CardListRetrievalResponseModel['data'];
};

export function useCardUseCase({ initialData }: Props) {
	const pagination = usePagination({
		entity: 'card',
		fetchFn: getCardList,
		initialData,
	});

	const table = useCardTableUseCase();

	return { pagination, table };
}

export type UseCardUseCaseType = ReturnType<typeof useCardUseCase>;
