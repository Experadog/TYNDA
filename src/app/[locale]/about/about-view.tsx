'use client';
import { useViewModel } from '@/i18n/getTranslate';
// import { UnderDevelopment } from '@components';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import Hero from './_components/hero';

const Conductor = dynamic(() => import('./_components/conductor'), { ssr: true });

interface IProps {}

const AboutView: FC<IProps> = () => {
	const viewModel = useViewModel(['AboutCompany']);

	return (
		<>
			<Hero
				heroViewModel={viewModel.hero}
			/>
			<div className="lg:px-5 max-w-[1340px] m-auto">
				<Conductor />
			</div>
			{/* <UnderDevelopment title={viewModel.title} /> */}
		</>
	);
};

export default AboutView;
