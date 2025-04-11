'use client';

import { FC } from 'react';
import InfoForm from '../_components/info-form';
import PhoneVerificationDialog from '../_components/phone-verification/phone-verification-dialog';

interface IProps {}

const UpdateProfileInfoView: FC<IProps> = ({}) => {
    return (
        <div className='flex flex-col gap-12 py-3 w-full'>
            <p className='text-foreground_1 font-semibold text-2xl'>
                Личные данные
            </p>

            <p className='text-foreground_2 font-semibold text-xl'>
                Информация об аккаунте
            </p>

            <InfoForm />
            <PhoneVerificationDialog />
        </div>
    );
};

export default UpdateProfileInfoView;
