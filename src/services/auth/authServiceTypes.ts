import type { Session } from '@business-entities';
import type { CommonResponse } from '@common';

// Login
export type LoginRequestModel = { email: string; password: string };
export type LoginResponseModel = CommonResponse<Session>;

// Login via
export type GoogleLoginRequestModel = { code: string; locale: Locale };
export type GoogleLoginResponseModel = LoginResponseModel;

// Register establisher
export type RegisterEstablisherRequestModel = {
	email: string;
	role: string;
	password: string;
	first_name: string;
	last_name: string;
	confirm_password?: string;
};

// Register client
export type RegisterClientRequestModel = {
	email: string;
	role: string;
	password: string;
	confirm_password?: string;
};

// Account activation

export type AccountActivationRequestModel = {
	email: string;
	code: string;
};

export type AccountActivationResponseModel = CommonResponse<string>;

export type RegisterResponseModel = CommonResponse<string>;
