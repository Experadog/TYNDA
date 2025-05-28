import type { UserFormValues, UserSchema } from '@common';
import { Button, CustomFormField, Form, ImgUploader } from '@components';
import { useUsersContext } from '../../context/users-context-provider';

type Props = {
	schema: UserSchema;
	onClose: () => void;
	onSubmit: (values: UserFormValues) => Promise<void>;
};

const UsersForm = ({ schema, onClose, onSubmit }: Props) => {
	const {
		modal: {
			states: { selectedUser },
		},
	} = useUsersContext();

	const onImageChange = (file: File | null) => {
		schema.setValue('avatar', file);
	};

	return (
		<Form {...schema}>
			<form className="w-full flex flex-col gap-4" onSubmit={schema.handleSubmit(onSubmit)}>
				{!selectedUser && (
					<>
						<CustomFormField
							control={schema.control}
							name="email"
							placeholder="Почта"
							type="text"
							label="Электронная почта"
							InputClassName="bg-input_bg pr-28"
						/>

						<CustomFormField
							control={schema.control}
							name="password"
							placeholder="Пароль"
							type="password"
							label="Пароль"
							InputClassName="bg-input_bg"
						/>
					</>
				)}

				{selectedUser && (
					<div className="p-3 w-full flex justify-center">
						<ImgUploader
							onChange={onImageChange}
							circle
							size="lg"
							defaultValue={selectedUser.avatar || ''}
						/>
					</div>
				)}

				<CustomFormField
					control={schema.control}
					name="first_name"
					placeholder="Иван"
					type="text"
					label="Имя (опционально)"
					InputClassName="bg-input_bg"
				/>

				<CustomFormField
					control={schema.control}
					name="last_name"
					placeholder="Иванов"
					type="text"
					label="Фамилия (опционально)"
					InputClassName="bg-input_bg"
				/>

				<div className="flex justify-end gap-3 items-center">
					<Button
						className="rounded-lg"
						disableAnimation
						size={'default'}
						onClick={onClose}
					>
						Закрыть
					</Button>

					<Button
						className="rounded-lg bg-orange text-white"
						disableAnimation
						type="submit"
						size={'default'}
					>
						Сохранить изменения
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default UsersForm;
