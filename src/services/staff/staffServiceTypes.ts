import type { Staff } from '@business-entities';
import type { CommonResponse, Paginated, Params, StaffFormValues } from '@common';

export type StaffCreationRequestModel = StaffFormValues;
export type StaffCreationResponseModel = CommonResponse<string>;

export type StaffRetrievalResponseModel = CommonResponse<Paginated<Staff>>;
export type StaffUpdatingRequestModel = {
	payload: Partial<StaffFormValues>;
	id: string;
};

export type StaffUpdatingResponseModel = CommonResponse<string>;

export type StaffDeletionResponseModel = CommonResponse<string>;
export type StaffDeletionRequestModel = Pick<Params, 'id'>;
