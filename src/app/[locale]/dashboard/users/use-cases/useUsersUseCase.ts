import type { GetUsersResponseModel } from '@/services';

type Props = {
	data: GetUsersResponseModel['data'];
};

export function useUserUseCase({ data }: Props) {
	const states = { data };
	return { states };
}
export type UseUsersUseCaseType = ReturnType<typeof useUserUseCase>;
