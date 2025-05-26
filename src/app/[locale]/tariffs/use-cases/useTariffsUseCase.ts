'use client';
import { useViewModel } from '@/i18n/getTranslate';

export function useTariffsUseCase() {
  const viewModel = useViewModel(['Tariffs']);

  return { viewModel: { tariffs: viewModel } };
}
