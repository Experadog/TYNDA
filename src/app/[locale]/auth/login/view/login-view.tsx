'use client';

import { Input } from '@/components/ui/input';
import {
    Button,
    Fade,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@components';
import { FC } from 'react';
import { useLoginUseCase } from '../use-case/useLoginUseCase';

const LoginView: FC = () => {
    const { form, isLoading, onSubmit, viewModel } = useLoginUseCase();

    return (
        <div className='flex flex-col gap-5 items-center'>
            <Fade duration={1}>
                <p className='text-white text-2xl font-bold uppercase'>{viewModel.title}</p>
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
                            Войти
                        </Button>
                    </form>
                </Form>
            </Fade>
        </div>
    );
};

export default LoginView;
