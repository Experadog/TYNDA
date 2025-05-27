import type { ClientHistory, User } from '@business-entities';
import type { CommonResponse, Paginated } from '@common';

export type ProfileResponseModel = CommonResponse<User>;

export type ClientHistoryResponseModel = CommonResponse<Paginated<ClientHistory>>;

export type ProfileUpdateResponseModel = CommonResponse<string>;
export type PhoneFirstStepVerificationResponseModel = CommonResponse<string>;

export type CredentialsUpdateResponseModel = CommonResponse<string>;
export type CredentialsUpdateRequestModel = {
	new_password: string;
	old_password: string;
	confirm_password: string;
};

export type PhoneSecondStepVerificationRequestModel = {
	code: string;
	request_id: string;
};