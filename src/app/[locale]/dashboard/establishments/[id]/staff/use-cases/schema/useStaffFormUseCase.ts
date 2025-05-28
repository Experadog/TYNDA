import { useViewModel } from '@/i18n/getTranslate';
import { createStaffSchema } from '@common';

export function useStaffFromUseCase() {
	const viewModel = useViewModel(['Validation']);

	const schema = createStaffSchema(viewModel, null, false);

	return schema;
}
