'use client';

import { Link } from '@/i18n/routing';
import { PAGES } from '@/lib';
import { useLocale } from '@/providers/locale/locale-provider';
import EmptyView from '../_components/empty-view';
import EstablishmentList from '../_components/list/establishment-list';
import { useEstablishmentContext } from '../use-case/establishment-context-provider';

const EstablishmentsView = () => {
	const { pagination, viewModel } = useEstablishmentContext();

	const {
		states: { list, total, isLoading, hasNextPage },
		actions: { onGoNextPage },
	} = pagination;

	const { locale } = useLocale();

	return list.length ? (
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
				items={list}
				locale={locale}
				onLoadMore={onGoNextPage}
				totalItems={total}
				isEnd={!hasNextPage}
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
