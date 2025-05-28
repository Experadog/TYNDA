import type { PageSettings } from '@common';
import { usePageSettingsUseCase } from './usePageSettingsUseCase';
import { useProfileSettingsUseCase } from './useProfileSettingsUseCase';

export function useSettingsUseCase(settings: PageSettings) {
	const page_settings = usePageSettingsUseCase(settings);
	const profile_settings = useProfileSettingsUseCase();

	return { page_settings, profile_settings };
}

export type UseSettingsUseCaseType = ReturnType<typeof useSettingsUseCase>;
