'use client';

import { useViewModel } from '@/i18n/getTranslate';
import MainInfoBlock from '../_components/divisions/main/main-info-block';
import BlockWrapper from '../_components/ui/block-wrapper';
import TabsSwitcher from '../_components/ui/tabs-switcher';

const EstablishmentCreationView = () => {
	const viewModel = useViewModel(['Shared']);

	return (
		<div className="flex flex-col gap-7">
			<BlockWrapper>
				<TabsSwitcher />
			</BlockWrapper>
			<BlockWrapper>
				<MainInfoBlock categoriesViewModel={viewModel.establishment_categories} />
			</BlockWrapper>
		</div>
	);
};

export default EstablishmentCreationView;
