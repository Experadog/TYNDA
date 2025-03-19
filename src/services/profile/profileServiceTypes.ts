import { ClientHistory } from '@business-entities';
import { CommonResponse } from '@common';
import { Session } from 'inspector/promises';

export type ProfileResponseModel = CommonResponse<Session>;

export type ClientHistoryResponseModel = CommonResponse<ClientHistory[]>;
