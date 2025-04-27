'use client';

import { useViewModel } from '@/i18n/getTranslate';
import { useRouter } from '@/i18n/routing';
import { PAGES, YANDEX_CLIENT_ID, createDynamicCallbackUrl } from '@/lib';
import { useLocale } from '@/providers/locale/locale-provider';
import { useUser } from '@/providers/user/user-provider';
import {
	type GoogleLoginRequestModel,
	type GoogleLoginResponseModel,
	type LoginRequestModel,
	type LoginResponseModel,
	login,
	sendAndLoginByGoogle,
} from '@/services';
import { UserRole } from '@business-entities';
import { createAction, createLoginSchema, useAsyncAction } from '@common';
import { useGoogleLogin } from '@react-oauth/google';

export const useLoginUseCase = () => {
	const viewModel = useViewModel(['Toast', 'Login']);

	const { setUser } = useUser();
	const router = useRouter();
	const { locale } = useLocale();

	const { execute: loginExecute, isLoading: isLoginLoading } = useAsyncAction<
		LoginResponseModel,
		[LoginRequestModel]
	>({
		messages: viewModel.Toast.Login,
	});

	const { execute: googleLoginExecute } = useAsyncAction<
		GoogleLoginResponseModel,
		[GoogleLoginRequestModel]
	>({
		messages: viewModel.Toast.GoogleLogin,
	});

	const navigate = (role: UserRole) => {
		if (role === UserRole.ESTABLISHER) {
			router.push(PAGES.DASHBOARD);
		}

		if (role === UserRole.CLIENT) {
			router.push(PAGES.PROFILE);
		}
	};

	const loginAction = createAction({
		requestAction: login,
		onSuccess: (response) => {
			setUser(response.data.user);
			navigate(response.data.user.role);
		},
	});

	const sendGoogleCodeAction = createAction({
		requestAction: sendAndLoginByGoogle,
		onSuccess: (response) => {
			setUser(response.data.user);
			navigate(response.data.user.role);
		},
		onError: () => {
			router.push(PAGES.LOGIN);
		},
	});

	const form = createLoginSchema({
		email: 'Почта является не корректной',
		password: 'Длинна пароля должна составлять минимум 6',
	});

	const onCommonLogin = async (values: LoginRequestModel) => {
		await loginExecute(loginAction, values);
	};

	const onSendGoogleCode = async (values: GoogleLoginRequestModel) => {
		await googleLoginExecute(sendGoogleCodeAction, values);
	};

	const loginWithYandex = () => {
		const redirect_uri = createDynamicCallbackUrl(locale);
		const authUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${YANDEX_CLIENT_ID}&redirect_uri=${redirect_uri}`;
		router.push(authUrl);
	};

	const loginVia = {
		google: useGoogleLogin({
			flow: 'auth-code',
			ux_mode: 'redirect',
			redirect_uri: createDynamicCallbackUrl(locale),
		}),

		yandex: loginWithYandex,
	};

	return {
		isCommonLoginLoading: isLoginLoading,
		onSendGoogleCode,
		onCommonLogin,
		form,
		viewModel: viewModel.Login,
		loginVia,
	};
};
