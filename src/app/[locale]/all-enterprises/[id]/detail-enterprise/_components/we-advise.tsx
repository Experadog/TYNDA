'use client';
import RecommendationCard from '@/app/[locale]/(home)/_components/recommendationCard';
import type { EstablishmentListItem } from '@/business-entities/establishment/EstablishmentEntity';
import { Button, LoadingSpinner } from '@components';
import type { FC } from 'react';

interface IProps {
	viewModel: ViewModel['DetailEnterprise']['weAdvise'];
	list: EstablishmentListItem[];

	isLoading: boolean;
	hasNextPage: boolean;
	onGoNextPage: () => Promise<void>;
}

const WeAdvise: FC<IProps> = ({ list, hasNextPage, isLoading, onGoNextPage, viewModel }) => {
	return (
		<div className="mb-[145px] w-full flex flex-col">
			<div className="flex flex-col gap-[20px]">
				<h2 className="text-4xl font-medium text-center my-10">
					{viewModel.similarEnterprise}
				</h2>
			</div>
			<div className="grid grid-cols-4 md:grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 justify-items-center">
				{list.map((establishment) => (
					<RecommendationCard key={establishment.id} establishment={establishment} />
				))}
			</div>

			{hasNextPage && (
				<Button
					className="py-5 my-5 max-w-[400px] w-full mx-auto rounded-xl"
					variant={'yellow'}
					disableAnimation
					onClick={onGoNextPage}
					disabled={isLoading}
				>
					{isLoading ? <LoadingSpinner /> : 'Загрузить еще'}
				</Button>
			)}
		</div>
	);
};

export default WeAdvise;
