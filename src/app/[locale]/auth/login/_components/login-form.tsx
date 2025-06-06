import { Button, CustomFormField, Form } from '@components';
import { useLoginUseCase } from '../use-case/useLoginUseCase';

const LoginForm = () => {
	const { form, onCommonLogin, isCommonLoginLoading } = useLoginUseCase();

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onCommonLogin)} className="mt-7">
				<CustomFormField
					control={form.control}
					placeholder="Введите вашу электронную почту"
					type="email"
					name="email"
					className="mb-5"
					InputClassName="xs:py-5 xs:rounded-lg text-white"
				/>

				<CustomFormField
					control={form.control}
					placeholder="Введите ваш пароль"
					type="password"
					name="password"
					InputClassName="xs:py-5 xs:rounded-lg text-white"
				/>

				<Button
					disabled={!!Object.values(form.formState.errors).length || isCommonLoginLoading}
					type="submit"
					variant={'yellow'}
					disableAnimation
					className="my-8 w-full rounded-3xl p-6 xs:py-2 xs:rounded-md"
				>
					Войти
				</Button>
			</form>
		</Form>
	);
};

export default LoginForm;
