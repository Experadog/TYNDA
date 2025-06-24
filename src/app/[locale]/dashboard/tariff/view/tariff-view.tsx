'use client';

import TariffActionModal from '../_components/modal/tariff-action-modal';
import TariffDeletionModal from '../_components/modal/tariff-deletion-modal';
import TariffTable from '../_components/table/tariff-table';

const TariffView = () => {
	return (
		<>
			<TariffTable />
			<TariffActionModal />
			<TariffDeletionModal />
		</>
	);
};

export default TariffView;
