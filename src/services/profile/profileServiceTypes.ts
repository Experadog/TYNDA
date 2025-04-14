import { ClientHistory } from '@business-entities';
import { CommonResponse, Paginated } from '@common';
import { Session } from 'inspector/promises';

export type ProfileResponseModel = CommonResponse<Session>;

export type ClientHistoryResponseModel = CommonResponse<Paginated<ClientHistory>>;

export type ProfileUpdateResponseModel = CommonResponse<string>;
export type PhoneFirstStepVerificationResponseModel = CommonResponse<string>;

export type CredentialsUpdateResponseModel = CommonResponse<string>;
export type CredentialsUpdateRequestModel = {
    new_password: string;
    old_password: string;
    confirm_password: string;
};
