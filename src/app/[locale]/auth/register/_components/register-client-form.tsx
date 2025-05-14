import { Button, CustomFormField, Form } from '@components';
import type { FC } from 'react';
import { useRegisterUseCase } from '../use-case/useRegisterUseCase';

type IProps = {};

const RegisterClientForm: FC<IProps> = () => {
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
					name="email"
				/>

				<CustomFormField
					control={clientForm.control}
					placeholder="Введите ваш пароль"
					type="password"
					name="password"
				/>

				<CustomFormField
					control={clientForm.control}
					placeholder="Подтвердите ваш пароль"
					type="password"
					name="confirm_password"
				/>

				<Button
					onClick={openAndTriggerConfirmModal}
					variant={'yellow'}
					type="button"
					className="w-full rounded-3xl p-6"
				>
					Далее
				</Button>
			</form>
		</Form>
	);
};

export default RegisterClientForm;
