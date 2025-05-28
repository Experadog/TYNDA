import type { User } from '@business-entities';
import type { CommonResponse, Paginated } from '@common';

export type GetUsersResponseModel = CommonResponse<Paginated<User>>;
