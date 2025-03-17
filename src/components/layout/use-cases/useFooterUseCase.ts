'use client';
import { useViewModel } from '@/i18n/getTranslate';

export function useFooterUseCase() {
  const viewModel = useViewModel(['Layout']);

  return { viewModel };
}
