'use client';

import { useViewModel } from '@/i18n/getTranslate';
import { Translate } from '@components';
import type { FC } from 'react';

interface IProps {
	title: string;
}

const UnderDevelopment: FC<IProps> = ({ title }) => {
	const viewModel = useViewModel(['UnderDevelopment']);

	return (
		<div className="mt-[75px] lg:mt-[60px] lg:mx-5">
			<Translate direction="right" distance={100} animateOnce={false}>
				<div className="flex flex-col items-center justify-center gap-5 lg:px-5">
					<h3 className="uppercase text-lg font-semibold text-gray-700">
						{viewModel.title1} "{title}" {viewModel.title2}
					</h3>
					<Translate direction="right" distance={100} animateOnce={false}>
						<h2 className="font-medium text-4xl md:text-2xl exs:text-lg max-w-[830px] text-center text-gray-800">
							{viewModel.description}
						</h2>
					</Translate>
				</div>
			</Translate>

			<Translate direction="up" distance={50} animateOnce={false}>
				<div className="flex items-center justify-center mt-14">
					<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 max-w-2xl text-center">
						<div className="text-yellow-500 text-5xl mb-4">🚧</div>
						<h3 className="text-xl font-semibold text-gray-800 mb-2">
							{viewModel.soon}
						</h3>
						<p className="text-gray-600">{viewModel.ourTeam}</p>
					</div>
				</div>
			</Translate>
		</div>
	);
};

export default UnderDevelopment;
