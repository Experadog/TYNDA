'use client';
import { useViewModel } from '@/i18n/getTranslate';
import { UnderDevelopment } from '@components';

const AboutView = () => {
	const viewModel = useViewModel(['About']);

	return (
		<div>
			<UnderDevelopment title={viewModel.title} />
		</div>
	);
};

export default AboutView;
