'use client';

import { pushMessage } from '@/common/push-mesage/push-mesage';
import { Input } from '@/components/ui/input';
import { useViewModel } from '@/i18n';
import { useRouter } from '@/i18n/routing';
import { PAGES } from '@/lib';
import { useUser } from '@/providers/user/user-provider';
import { createLoginSchema, useAsyncAction } from '@common';
import {
    Button,
    Fade,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    LoadingSpinner,
} from '@components';
import { FC } from 'react';
import { login, RequestModel } from './action';

const LoginView: FC = () => {
    const { isLoading, execute } = useAsyncAction();
    const viewModel = useViewModel(['PushMessages']);
    const { setUser } = useUser();

    const router = useRouter();

    const form = createLoginSchema({
        email: 'Введите корректный email',
        password: 'Минимум 6',
    });

    const action = async (values: RequestModel) => {
        const { code, data } = await login(values);
        pushMessage({
            code,
            messages: viewModel.Login,
        });

        if (data) {
            setUser(data.user);
            router.push(PAGES.PROFILE);
        }
    };

    const onSubmit = async (values: RequestModel) => {
        await execute(() => action(values));
    };

    return (
        <div className='flex flex-col gap-5 items-center'>
            <Fade duration={1}>
                <p className='text-white text-2xl font-bold uppercase'>Войти в аккаунт</p>
            </Fade>

            <Fade duration={1}>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='bg-background_2  p-5 rounded-xl flex flex-col gap-5 w-[400px]'
                    >
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Почта</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='email'
                                            placeholder='your@email.com'
                                            {...field}
                                        />
                                    </FormControl>
                                    <div className='h-5'>
                                        <FormMessage className='text-red-500' />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Пароль</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='password'
                                            placeholder='Введите пароль'
                                            {...field}
                                        />
                                    </FormControl>
                                    <div className='h-5'>
                                        <FormMessage className='text-red-500' />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <Button
                            disabled={isLoading}
                            type='submit'
                            className='bg-yellow text-white flex items-center gap-2'
                        >
                            {isLoading && <LoadingSpinner />}
                            Войти
                        </Button>
                    </form>
                </Form>
            </Fade>
        </div>
    );
};

export default LoginView;
