import type { GetRolesResponseModel } from '@/services/roles/roleServiceTypes';

type Props = {
	roles: GetRolesResponseModel['data'];
};

export function useRolesUseCase({ roles }: Props) {
	const states = { roles };
	const actions = {};

	return { states, actions };
}

export type UseRolesUseCaseType = ReturnType<typeof useRolesUseCase>;
