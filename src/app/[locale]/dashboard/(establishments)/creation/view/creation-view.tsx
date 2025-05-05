'use client';

import { useViewModel } from '@/i18n/getTranslate';
import GeolocationBlock from '../_components/divisions/main/geolocation-block';
import ImagesBlock from '../_components/divisions/main/images-block';
import MainInfoBlock from '../_components/divisions/main/main-info-block';
import BlockWrapper from '../_components/ui/block-wrapper';
import TabsSwitcher from '../_components/ui/tabs-switcher';

const EstablishmentCreationView = () => {
	const viewModel = useViewModel(['Shared']);

	return (
		<div className="flex flex-col gap-7 min-w-0">
			<BlockWrapper>
				<TabsSwitcher />
			</BlockWrapper>
			<BlockWrapper>
				<MainInfoBlock categoriesViewModel={viewModel.establishment_categories} />
			</BlockWrapper>

			<BlockWrapper>
				<ImagesBlock />
			</BlockWrapper>

			<BlockWrapper>
				<GeolocationBlock />
			</BlockWrapper>
		</div>
	);
};

export default EstablishmentCreationView;
