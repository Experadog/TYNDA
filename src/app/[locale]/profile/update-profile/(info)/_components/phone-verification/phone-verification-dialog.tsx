import { Dialog, DialogContent } from '@components';
import { FC } from 'react';
import { useUpdateProfileUseCase } from '../../../use-case/useUpdateProfileUseCase';
import PreVerification from './pre-verification';
import Verification from './verification';

interface IProps {}

const PhoneVerificationDialog: FC<IProps> = ({}) => {
    const {
        actions: { phone },
        states: {
            phone: { preVerification },
        },
    } = useUpdateProfileUseCase();

    return (
        <Dialog
            open={preVerification.isOpen}
            onOpenChange={phone.preVerification.close}
        >
            <DialogContent className='bg-background_1 p-10 border-none'>
                {!preVerification.isExecuted ? <PreVerification /> : <Verification />}
            </DialogContent>
        </Dialog>
    );
};

export default PhoneVerificationDialog;
