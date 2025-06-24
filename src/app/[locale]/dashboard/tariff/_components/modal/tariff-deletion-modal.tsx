import { useLocale } from '@/providers/locale/locale-provider';
import { DeletionConfirmModal } from '@components';
import { useTariffContext } from '../../context/tariff-context-provider';

const TariffDeletionModal = () => {
	const { modal, deletion } = useTariffContext();

	const { locale } = useLocale();

	const { isDeletionModal, selectedTariff } = modal;

	const onConfirm = async () => {
		if (!selectedTariff) return;
		await deletion.onDelete(selectedTariff.id);
	};

	return (
		<DeletionConfirmModal
			onClose={modal.onCloseDeletionModal}
			onConfirm={onConfirm}
			open={isDeletionModal}
			text={`Вы действительно хотите удалить тариф: '${selectedTariff?.translates[locale].name}' ?`}
		/>
	);
};

export default TariffDeletionModal;
