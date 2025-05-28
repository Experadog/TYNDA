import { type StaffRetrievalResponseModel, getStaff } from '@/services';
import type { Staff } from '@business-entities';
import { usePagination } from '@common';

export function useStaffPaginationUseCase(initialData: StaffRetrievalResponseModel['data']) {
	const params = usePagination<Staff>(initialData, getStaff, 'staff');

	return params;
}
