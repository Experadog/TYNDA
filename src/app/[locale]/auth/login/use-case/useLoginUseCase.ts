'use client';

import { useViewModel } from '@/i18n/getTranslate';
import { useRouter } from '@/i18n/routing';
import { PAGES, YANDEX_CLIENT_ID, createDynamicCallbackUrl } from '@/lib';
import { useChatWebSocket } from '@/providers/chat-webscoket/chat-webscoket-provider';
import { useLocale } from '@/providers/locale/locale-provider';
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
	const viewModel = useViewModel(['Toast', 'Login', 'Validation']);

	const router = useRouter();
	const { locale } = useLocale();
	const { connectWebSocket } = useChatWebSocket();

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

	const navigate = (role: UserRole, isSuperUser: boolean) => {
		if (
			isSuperUser ||
			role === UserRole.ESTABLISHER ||
			role === UserRole.ESTABLISHMENT_WORKER
		) {
			router.replace(PAGES.DASHBOARD);
			return;
		}

		if (role === UserRole.CLIENT) {
			router.replace(PAGES.PROFILE);
			return;
		}

		setTimeout(() => {
			connectWebSocket();
		}, 2000);
	};

	const loginAction = createAction({
		requestAction: login,
		onSuccess: (response) => {
			navigate(response.data.user.role, response.data.user.is_superuser);
		},
	});

	const sendGoogleCodeAction = createAction({
		requestAction: sendAndLoginByGoogle,
		onSuccess: (response) => {
			navigate(response.data.user.role, response.data.user.is_superuser);
		},
		onError: () => {
			router.replace(PAGES.LOGIN);
		},
	});

	const form = createLoginSchema(viewModel.Validation);

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
