import type { Role, RoleDetailed } from '@business-entities';
import type { CommonResponse, Paginated } from '@common';

export type GetRolesResponseModel = CommonResponse<Paginated<Role>>;
export type GetDetailedRolesResponseModel = CommonResponse<RoleDetailed>;
