import { phoneFormatter } from '@/lib';
import { useUser } from '@/providers/user/user-provider';
import {
    Button,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    LoadingSpinner,
} from '@components';
import { FC } from 'react';
import { useUpdateProfileUseCase } from '../../../use-case/useUpdateProfileUseCase';

interface IProps {}

const PreVerification: FC<IProps> = ({}) => {
    const { user } = useUser();

    const {
        actions: { phone },
        states: {
            phone: { preVerification },
        },
    } = useUpdateProfileUseCase();

    return (
        <>
            <DialogHeader>
                <DialogTitle className='text-foreground_1 text-center mb-6 text-xl '>
                    Подтверждения номера телефона
                </DialogTitle>
                <DialogDescription className='text-gray text-center numeric'>
                    В телеграм будет отправлен код подтверждения, по номеру:{' '}
                    {phoneFormatter(user?.phone)}
                </DialogDescription>
            </DialogHeader>

            {preVerification.isLoading ? (
                <LoadingSpinner className='mx-auto size-12  stroke-yellow' />
            ) : (
                <DialogFooter className='mt-5'>
                    <div className='flex flex-col w-full gap-5'>
                        <Button
                            onClick={phone.preVerification.start}
                            type='button'
                            variant={'yellow'}
                            className='text-white text-sm font-semibold rounded-2xl p-6'
                        >
                            Получить код
                        </Button>

                        <Button
                            onClick={phone.preVerification.close}
                            type='button'
                            variant={'default'}
                            className='text-foreground_1 bg-light_gray text-sm font-semibold rounded-2xl p-6 shadow-none'
                        >
                            Закрыть
                        </Button>
                    </div>
                </DialogFooter>
            )}
        </>
    );
};

export default PreVerification;
