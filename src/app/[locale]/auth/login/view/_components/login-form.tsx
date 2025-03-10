import { Button, CustomFormField, Form } from '@components';
import { FC } from 'react';
import { useLoginUseCase } from '../../use-case/useLoginUseCase';

interface IProps {}

const LoginForm: FC<IProps> = ({}) => {
    const { form, onCommonLogin, isCommonLoginLoading } = useLoginUseCase();

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onCommonLogin)}
                className='mt-7'
            >
                <CustomFormField
                    control={form.control}
                    placeholder='Введите вашу электронную почту'
                    type='email'
                    name='email'
                    className='mb-5'
                />

                <CustomFormField
                    control={form.control}
                    placeholder='Введите ваш пароль'
                    type='password'
                    name='password'
                />

                <Button
                    disabled={!!Object.values(form.formState.errors).length || isCommonLoginLoading}
                    type='submit'
                    className='bg-yellow text-white my-8 w-full p-6 disabled:bg-gray rounded-3xl text-base font-semibold shadow-none'
                >
                    Войти
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;
