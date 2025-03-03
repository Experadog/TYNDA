import { Session } from '@business-entities';
import { CommonResponse } from '@common';

// Login
export type LoginRequestModel = { email: string; password: string };
export type LoginResponseModel = CommonResponse<Session>;
