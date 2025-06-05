'use client';

import { useUser } from '@/providers/user/user-provider';
import type { EstablishmentListItem } from '@business-entities';
import { Button, DeletionConfirmModal, LoadingSpinner } from '@components';
import { useDeletionUseCase } from '../../use-case/stories/useDeletionUseCase';
import EstablishmentItem from './establishment-item';

type Props = {
	items: EstablishmentListItem[];
	locale: Locale;
	viewModel: {
		deletionViewModel: ViewModel['Toast']['EstablishmentDeletion'];
		categoriesViewModel: ViewModel['Shared']['establishment_categories'];
	};
	onLoadMore: () => Promise<void>;
	totalItems: number;
	isLoading: boolean;
	isEnd: boolean;
};

const EstablishmentList = ({
	items,
	locale,
	viewModel,
	onLoadMore,
	totalItems,
	isLoading,
	isEnd,
}: Props) => {
	const { user } = useUser();
	const deletionUseCase = useDeletionUseCase({ viewModel: viewModel.deletionViewModel });

	return (
		<div className="flex flex-col h-full gap-10">
			<div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
				{items.map((item) => (
					<EstablishmentItem
						isSuperUser={user?.is_superuser || false}
						onDelete={deletionUseCase.onOpenConfirm}
						key={item.id}
						item={item}
						locale={locale}
						viewModel={viewModel.categoriesViewModel}
					/>
				))}
			</div>
			{isLoading ? (
				<LoadingSpinner className="mx-auto size-14 text-yellow" />
			) : (
				!isEnd && (
					<Button
						className="py-5 max-w-[400px] w-full mx-auto mt-auto rounded-xl"
						variant={'yellow'}
						disableAnimation
						onClick={onLoadMore}
					>
						Загрузить еще
					</Button>
				)
			)}

			<DeletionConfirmModal
				onClose={deletionUseCase.onCloseConfirm}
				open={deletionUseCase.isConfirm}
				onConfirm={deletionUseCase.onDelete}
				text={'После удаления, предприятие невозможно восстановить'}
			/>
		</div>
	);
};

export default EstablishmentList;
