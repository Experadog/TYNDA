'use client';

import { Link } from '@/i18n/routing';
import { PAGES } from '@/lib';
import { useLocale } from '@/providers/locale/locale-provider';
import EmptyView from '../_components/empty-view';
import EstablishmentList from '../_components/list/establishment-list';
import { useEstablishmentContext } from '../use-case/establishment-context-provider';
import { useRetrievalUseCase } from '../use-case/stories/useRetrievalUseCase';

const EstablishmentsView = () => {
	const {
		states: { establishments, viewModel },
	} = useEstablishmentContext();

	const retrievalUseCase = useRetrievalUseCase(establishments);

	const {
		states: { items, totalItems, isLoading },
		actions: { onLoadMore },
	} = retrievalUseCase;

	const { locale } = useLocale();

	return items.length ? (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<Link
					href={PAGES.ESTABLISHMENT_CREATION}
					className="px-4 py-2 bg-yellow text-white rounded-xl"
				>
					Добавить
				</Link>
			</div>
			<EstablishmentList
				items={items}
				locale={locale}
				onLoadMore={onLoadMore}
				totalItems={totalItems}
				viewModel={{
					deletionViewModel: viewModel.Toast.EstablishmentDeletion,
					categoriesViewModel: viewModel.Shared.establishment_categories,
				}}
				isLoading={isLoading}
			/>
		</div>
	) : (
		<EmptyView />
	);
};

export default EstablishmentsView;
