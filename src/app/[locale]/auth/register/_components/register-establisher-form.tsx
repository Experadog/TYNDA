import { Button, CustomFormField, Form } from '@components';
import { useRegisterUseCase } from '../use-case/useRegisterUseCase';

const RegisterEstablisherForm = () => {
	const { states, actions } = useRegisterUseCase();
	const { partnerForm } = states;
	const { openAndTriggerConfirmModal } = actions;

	return (
		<Form {...partnerForm}>
			<form className="mt-7 flex flex-col gap-5">
				<div className="flex items-center gap-4">
					<CustomFormField
						control={partnerForm.control}
						placeholder="Введите ваше имя"
						InputClassName="xs:py-5 xs:rounded-lg text-white"
						type="text"
						name="first_name"
					/>

					<CustomFormField
						control={partnerForm.control}
						placeholder="Введите вашу фамилию"
						InputClassName="xs:py-5 xs:rounded-lg text-white"
						type="text"
						name="last_name"
					/>
				</div>
				<CustomFormField
					control={partnerForm.control}
					placeholder="Введите вашу почту"
					InputClassName="xs:py-5 xs:rounded-lg text-white"
					type="email"
					name="email"
				/>

				<CustomFormField
					control={partnerForm.control}
					placeholder="Введите ваш пароль"
					InputClassName="xs:py-5 xs:rounded-lg text-white"
					type="password"
					name="password"
				/>

				<CustomFormField
					control={partnerForm.control}
					placeholder="Подтвердите ваш пароль"
					InputClassName="xs:py-5 xs:rounded-lg text-white"
					type="password"
					name="confirm_password"
				/>

				<Button
					onClick={openAndTriggerConfirmModal}
					type="button"
					variant={'yellow'}
					className="w-full rounded-3xl p-6 xs:py-2 xs:rounded-md xs:my-3"
				>
					Далее
				</Button>
			</form>
		</Form>
	);
};

export default RegisterEstablisherForm;
