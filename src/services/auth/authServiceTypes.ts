import { Session } from '@business-entities';
import { CommonResponse } from '@common';

// Login
export type LoginRequestModel = { email: string; password: string };
export type LoginResponseModel = CommonResponse<Session>;

// Login via

export type GoogleLoginRequestModel = { role: string; code: string; locale: Locale };
export type GoogleLoginResponseModel = LoginResponseModel;
