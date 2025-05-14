'use client';

import { Button, CustomFormField, Form } from '@components';
import type { FC } from 'react';
import { useUpdateProfileUseCase } from '../../use-case/useUpdateProfileUseCase';

type IProps = {};

const CredentialsForm: FC<IProps> = ({}) => {
	const {
		states: { credentials },
		actions: { onUpdateCredentials },
	} = useUpdateProfileUseCase();

	return (
		<Form {...credentials.form}>
			<form
				onSubmit={credentials.form.handleSubmit(onUpdateCredentials)}
				className="bg-background_1 px-7 py-6 shadow-md rounded-2xl max-w-[50%] w-full"
			>
				<div className="flex flex-col gap-4 w-full">
					<CustomFormField
						name="old_password"
						control={credentials.form.control}
						placeholder="Введите ваш старый пароль"
						type="password"
						label="Старый пароль "
					/>

					<CustomFormField
						name="new_password"
						control={credentials.form.control}
						placeholder="Введите ваш новый пароль"
						type="password"
						label="Новый пароль "
					/>

					<CustomFormField
						name="confirm_password"
						control={credentials.form.control}
						placeholder="Подтвердите ваш новый пароль"
						type="password"
						label="Подтвердите новый пароль "
					/>
				</div>

				<Button variant={'yellow'} className="w-full mt-5 py-6 rounded-2xl">
					Изменить
				</Button>
			</form>
		</Form>
	);
};

export default CredentialsForm;
