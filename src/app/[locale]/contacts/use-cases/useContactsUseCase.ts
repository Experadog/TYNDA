'use client';
import { useViewModel } from '@/i18n/getTranslate';

export const useContactsUseCase = () => {
  const viewModel = useViewModel(['Contacts']);

  return { viewModel: { contacts: viewModel } }
};
