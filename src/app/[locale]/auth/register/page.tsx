import { FC } from 'react';
import { RegisterProvider } from './use-case/useRegisterUseCase';
import RegisterView from './view/register-view';

interface IProps {}

const Register: FC<IProps> = ({}) => {
    return (
        <RegisterProvider>
            <RegisterView />
        </RegisterProvider>
    );
};

export default Register;
