import { FC } from 'react';
import CredentialsForm from '../_components/credentials-form';

interface IProps {}

const UpdateProfileCredentialsView: FC<IProps> = ({}) => {
    return (
        <div className='flex flex-col gap-12 py-3 w-full'>
            <p className='text-foreground_1 font-semibold text-2xl'>Смена пароля</p>
            <CredentialsForm />
        </div>
    );
};

export default UpdateProfileCredentialsView;
