import {
    Button,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@components';
import { FC } from 'react';
import { useUpdateProfileUseCase } from '../../../use-case/useUpdateProfileUseCase';

interface IProps {}

const Verification: FC<IProps> = ({}) => {
    const {
        actions: {},
        states: {},
    } = useUpdateProfileUseCase();

    return (
        <>
            <DialogHeader>
                <DialogTitle className='text-foreground_1 text-center mb-6 text-xl '>
                    Подтверждения номера телефона
                </DialogTitle>
                <DialogDescription className='text-gray text-center numeric'>
                    Пожалуйста, введите код, который был отправлен в телеграм
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className='mt-5'>
                <div className='flex flex-col w-full gap-5'>
                    <Button
                        type='button'
                        variant={'yellow'}
                        className='text-white text-sm font-semibold rounded-2xl p-6'
                    >
                        Подтвердить
                    </Button>

                    <Button
                        type='button'
                        variant={'default'}
                        className='text-foreground_1 bg-light_gray text-sm font-semibold rounded-2xl p-6 shadow-none'
                    >
                        Назад
                    </Button>
                </div>
            </DialogFooter>
        </>
    );
};

export default Verification;
