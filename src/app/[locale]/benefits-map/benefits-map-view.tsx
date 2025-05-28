'use client';

import { useViewModel } from '@/i18n/getTranslate';
import { UnderDevelopment } from '@components';

const BenefitsMapView = () => {
	const viewModel = useViewModel(['BenefitsMap']);

	return (
		<div>
			<UnderDevelopment title={viewModel.title} />
		</div>
	);
};

export default BenefitsMapView;
