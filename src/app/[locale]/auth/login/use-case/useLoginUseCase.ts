'use client';

import { useViewModel } from '@/i18n';
import { useRouter } from '@/i18n/routing';
import { PAGES } from '@/lib';
import { useUser } from '@/providers/user/user-provider';
import { login, LoginRequestModel, LoginResponseModel } from '@/services';
import { createActionFactory, createLoginSchema, useAsyncAction } from '@common';

export const useLoginUseCase = () => {
    const viewModel = useViewModel(['Toast', 'Login']);

    const { setUser } = useUser();
    const router = useRouter();

    const { isLoading, execute } = useAsyncAction<LoginResponseModel, [LoginRequestModel]>({
        messages: viewModel.Toast.Login,
    });

    const form = createLoginSchema({
        email: 'Введите корректный email',
        password: 'Минимум 6',
    });

    const loginAction = createActionFactory<LoginRequestModel, LoginResponseModel>({
        requestAction: login,
        onSuccess: (response) => {
            if (response?.data) {
                setUser(response.data.user);
                router.push(PAGES.PROFILE);
            }
        },
    });

    const onSubmit = async (values: LoginRequestModel) => {
        await execute(loginAction, values);
    };

    return { isLoading, onSubmit, form, viewModel: viewModel.Login };
};
