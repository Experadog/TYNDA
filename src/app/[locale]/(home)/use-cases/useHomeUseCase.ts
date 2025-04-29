'use client';
import { useViewModel } from '@/i18n/getTranslate';

export function useHomeUseCase() {
	const viewModel = useViewModel(['Home', 'Shared']);

	return { viewModel: { home: viewModel.Home, shared: viewModel.Shared } };
}
