'use client'
import { useViewModel } from "@/i18n/getTranslate";


export function useDetailEnterpriseUseCase() {
  const viewModel = useViewModel(['DetailEnterprise']);


  return { viewModel };
}