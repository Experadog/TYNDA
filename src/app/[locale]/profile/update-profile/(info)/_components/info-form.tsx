import { useUser } from '@/providers/user/user-provider';
import { Button, CustomFormField, Form } from '@components';
import { FC } from 'react';
import { useUpdateProfileUseCase } from '../../use-case/useUpdateProfileUseCase';

interface IProps {}

const InfoForm: FC<IProps> = ({}) => {
    const { user } = useUser();
    const {
        actions: { onUpdateProfile, phone },
        states: { updateProfile },
    } = useUpdateProfileUseCase();

    return (
        <Form {...updateProfile.form}>
            <form
                className='flex flex-col gap-12 w-full'
                onSubmit={updateProfile.form.handleSubmit(onUpdateProfile)}
            >
                <div className='flex items-baseline gap-5'>
                    <CustomFormField
                        name='first_name'
                        control={updateProfile.form.control}
                        placeholder='Имя'
                        type='text'
                        label='Введите ваше имя'
                    />

                    <CustomFormField
                        name='last_name'
                        control={updateProfile.form.control}
                        placeholder='Фамилия'
                        type='text'
                        label='Введите вашу фамилию'
                    />
                </div>

                <div className='flex items-center gap-5'>
                    <div className='flex flex-col'>
                        <CustomFormField
                            name='phone'
                            control={updateProfile.form.control}
                            placeholder='Номер'
                            type='tel'
                            label='Введите ваш номер'
                            inputStyles={
                                !user?.is_phone_verified ? { border: '1px solid var(--error)' } : {}
                            }
                        />

                        {!user?.is_phone_verified && (
                            <div className='flex items-center'>
                                <p className='text-xs text-error font-semibold'>
                                    Подтвердите номер
                                </p>

                                <Button
                                    onClick={phone.preVerification.open}
                                    variant={'ghost'}
                                    size={'sm'}
                                    disableAnimation
                                    className='text-yellow hover:brightness-75'
                                    type='button'
                                >
                                    Подтвердить
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex items-center gap-6 w-full'>
                    <Button
                        type='button'
                        variant={'default'}
                        className='text-foreground_1 w-full  bg-light_gray text-sm font-semibold shadow-none py-5 rounded-2xl'
                    >
                        Сбросить
                    </Button>
                    <Button
                        disabled={updateProfile.isLoading}
                        type='submit'
                        variant={'yellow'}
                        className='text-sm m-0 w-full py-5 rounded-2xl'
                    >
                        Сохранить
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default InfoForm;
