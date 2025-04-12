'use client'
import { useViewModel } from "@/i18n/getTranslate";


export function useAllEnterprisesUseCase() {
  const viewModel = useViewModel(['AllEnterprises']);


  return { viewModel };
}