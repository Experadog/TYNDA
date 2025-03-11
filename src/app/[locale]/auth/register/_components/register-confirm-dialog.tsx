import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@components';
import { FC } from 'react';
import { useRegisterUseCase } from '../use-case/useRegisterUseCase';

interface IProps {}

const RegisterConfirmDialog: FC<IProps> = ({}) => {
    const { states, actions } = useRegisterUseCase();
    const { clientForm, isConfirmModal } = states;
    const { closeConfirmModal, onConfirm } = actions;

    return (
        <Dialog
            open={isConfirmModal}
            onOpenChange={closeConfirmModal}
        >
            <DialogContent className='bg-background_1 p-10 border-none'>
                <DialogHeader>
                    <DialogTitle className='text-foreground_1 text-center mb-6'>{clientForm.getValues('email')}</DialogTitle>
                    <DialogDescription className='text-gray text-center'>Проверьте, правильно ли указана ваша электронная почта - мы отправим на него код подтверждения</DialogDescription>
                </DialogHeader>
                <DialogFooter className='mt-5'>
                    <div className='flex flex-col w-full gap-5'>
                        <Button
                            onClick={onConfirm}
                            type='button'
                            variant={'yellow'}
                            className='text-white text-sm font-semibold rounded-2xl p-6'
                        >
                            Подтвердить
                        </Button>

                        <Button
                            onClick={closeConfirmModal}
                            type='button'
                            variant={'default'}
                            className='text-foreground_1 bg-light_gray text-sm font-semibold rounded-2xl p-6 shadow-none'
                        >
                            Назад
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default RegisterConfirmDialog;
