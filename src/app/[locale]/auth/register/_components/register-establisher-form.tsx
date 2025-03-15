import { Button, CustomFormField, Form } from '@components';
import { FC } from 'react';
import { useRegisterUseCase } from '../use-case/useRegisterUseCase';

interface IProps {}

const RegisterEstablisherForm: FC<IProps> = ({}) => {
    const { states, actions } = useRegisterUseCase();
    const { partnerForm } = states;
    const { openAndTriggerConfirmModal } = actions;

    return (
        <Form {...partnerForm}>
            <form className='mt-7 flex flex-col gap-5'>
                <div className='flex items-center gap-4'>
                    <CustomFormField
                        control={partnerForm.control}
                        placeholder='Введите ваше имя'
                        type='text'
                        name='first_name'
                    />

                    <CustomFormField
                        control={partnerForm.control}
                        placeholder='Введите вашу фамилию'
                        type='text'
                        name='last_name'
                    />
                </div>
                <CustomFormField
                    control={partnerForm.control}
                    placeholder='Введите вашу почту'
                    type='email'
                    name='email'
                />

                <CustomFormField
                    control={partnerForm.control}
                    placeholder='Введите ваш пароль'
                    type='password'
                    name='password'
                />

                <CustomFormField
                    control={partnerForm.control}
                    placeholder='Подтвердите ваш пароль'
                    type='password'
                    name='confirm_password'
                />

                <Button
                    onClick={openAndTriggerConfirmModal}
                    type='button'
                    variant={'yellow'}
                    className='w-full rounded-3xl p-6'
                >
                    Далее
                </Button>
            </form>
        </Form>
    );
};

export default RegisterEstablisherForm;
