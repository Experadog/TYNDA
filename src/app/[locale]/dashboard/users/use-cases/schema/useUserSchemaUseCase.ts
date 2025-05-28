import { useViewModel } from '@/i18n/getTranslate';
import { createUserSchema } from '@common';

export function useUserSchemaUseCase() {
	const viewModel = useViewModel(['Validation']);
	const schema = createUserSchema(viewModel);

	return schema;
}
