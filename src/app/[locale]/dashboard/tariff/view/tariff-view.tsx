'use client';

import TariffActionModal from '../components/modal/tariff-action-modal';
import TariffDeletionModal from '../components/modal/tariff-deletion-modal';
import TariffTable from '../components/table/tariff-table';

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
