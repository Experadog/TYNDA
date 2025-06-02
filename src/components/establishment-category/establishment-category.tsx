'use client';

import { useViewModel } from '@/i18n/getTranslate';
import type { EstablishmentCategory } from '@business-entities';

type Props = {
	category: EstablishmentCategory;
};

const EstablishmentCategoryComponent = ({ category }: Props) => {
	const viewModel = useViewModel(['Shared']);
	return <>{viewModel.establishment_categories[category]}</>;
};

export default EstablishmentCategoryComponent;
