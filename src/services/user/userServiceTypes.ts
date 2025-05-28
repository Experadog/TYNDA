import type { UserListItem } from '@business-entities';
import type { CommonResponse, Paginated, UserFormValues } from '@common';

export type UsersRetrievalResponseModel = CommonResponse<Paginated<UserListItem>>;

export type UserCreationResponseModel = CommonResponse<string>;
export type UserCreationRequestModel = UserFormValues;
