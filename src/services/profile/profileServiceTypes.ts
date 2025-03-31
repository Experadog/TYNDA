import { ClientHistory } from '@business-entities';
import { CommonResponse, Paginated } from '@common';
import { Session } from 'inspector/promises';

export type ProfileResponseModel = CommonResponse<Session>;

export type ClientHistoryResponseModel = CommonResponse<
    Paginated<ClientHistory>
>;

export type ProfileUpdateResponseModel = CommonResponse<string>;
