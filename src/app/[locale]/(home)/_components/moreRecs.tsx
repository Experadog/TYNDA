'use client';
import type { EstablishmentListItem } from '@/business-entities/establishment/EstablishmentEntity';
import { Translate } from '@components';
import type { FC } from 'react';
import MoreRecsCard from './moreRecsCard';

interface IProps {
	moreRecsViewModel: ViewModel['Home']['moreRecs'];
	establishments: EstablishmentListItem[];
}

const MoreRecs: FC<IProps> = ({ establishments, moreRecsViewModel }) => {
	return (
		<Translate direction="right" distance={100} animateOnce={false}>
			<div className="mt-[120px] lg:mt-[60px] flex flex-col items-center justify-center gap-[20px] ">
				{/* <h3 className="text-lg lg:text-base font-semibold uppercase">
					{moreRecsViewModel.title}
				</h3> */}
				<h2 className="text-[34px] lg:text-2xl font-medium">
					{moreRecsViewModel.description}
				</h2>
				<div className="mt-[40px] lg:mt-[10px] grid grid-cols-2 lg:grid-cols-1 justify-between gap-[25px] lg:gap-[30px]">
					<Translate direction="right" distance={100} animateOnce={false}>
						<div>
							{establishments[0] && (
								<MoreRecsCard
									key={establishments[0].id}
									mainClassName="w-[650px] lg:w-[353px] h-[745px] lg:h-[478px]"
									establishment={establishments[0]}
								/>
							)}
						</div>
					</Translate>

					<Translate direction="left" distance={100} animateOnce={false}>
						<div className="grid grid-cols-2 lg:grid-cols-1 gap-[25px] lg:gap-[10px]">
							{establishments.slice(0, 4).map((establishment) => (
								<MoreRecsCard
									key={establishment.id}
									mainClassName="w-[320px] lg:w-[100%] h-[360px] lg:h-[320px] lg:h-[280px]"
									establishment={establishment}
								/>
							))}
						</div>
					</Translate>
				</div>
			</div>
		</Translate>
	);
};

export default MoreRecs;
