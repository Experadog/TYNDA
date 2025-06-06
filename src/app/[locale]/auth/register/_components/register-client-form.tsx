import { Button, CustomFormField, Form } from '@components';
import { useRegisterUseCase } from '../use-case/useRegisterUseCase';

const RegisterClientForm = () => {
	const { states, actions } = useRegisterUseCase();
	const { clientForm } = states;
	const { openAndTriggerConfirmModal } = actions;

	return (
		<Form {...clientForm}>
			<form className="mt-7 flex flex-col gap-5">
				<CustomFormField
					control={clientForm.control}
					placeholder="Введите вашу почту"
					type="email"
					InputClassName="xs:py-5 xs:rounded-lg text-white"
					name="email"
				/>

				<CustomFormField
					control={clientForm.control}
					placeholder="Введите ваш пароль"
					type="password"
					InputClassName="xs:py-5 xs:rounded-lg text-white"
					name="password"
				/>

				<CustomFormField
					control={clientForm.control}
					placeholder="Подтвердите ваш пароль"
					type="password"
					InputClassName="xs:py-5 xs:rounded-lg text-white"
					name="confirm_password"
				/>

				<Button
					onClick={openAndTriggerConfirmModal}
					variant={'yellow'}
					type="button"
					className="my-8 w-full rounded-3xl p-6 xs:py-2 xs:rounded-md xs:my-3"
				>
					Далее
				</Button>
			</form>
		</Form>
	);
};

export default RegisterClientForm;
