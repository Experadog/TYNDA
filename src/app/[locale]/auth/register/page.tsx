import { RegisterProvider } from './use-case/useRegisterUseCase';
import RegisterView from './view/register-view';

const Register = () => {
	return (
		<RegisterProvider>
			<RegisterView />
		</RegisterProvider>
	);
};

export default Register;
