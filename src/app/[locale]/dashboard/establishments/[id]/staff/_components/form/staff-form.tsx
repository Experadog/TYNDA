import type { StaffFormValues, StaffSchema } from '@common';
import { CustomFormField, Form, ImgUploader } from '@components';
import { useStaffContext } from '../../context/staff-context-provider';

type Props = {
	schema: StaffSchema;
	onSubmit: (values: StaffFormValues) => Promise<void>;
};

const StaffForm = ({ schema, onSubmit }: Props) => {
	const {
		modal: {
			states: { selectedStaff },
		},
	} = useStaffContext();

	const onImageChange = (file: File | null) => {
		schema.setValue('avatar', file, { shouldDirty: true });
	};

	return (
		<Form {...schema}>
			<form
				id="staff-form"
				className="w-full flex flex-col gap-4"
				onSubmit={schema.handleSubmit(onSubmit)}
			>
				{!selectedStaff && (
					<>
						<CustomFormField
							control={schema.control}
							name="email_name"
							placeholder="Название"
							type="text"
							label="Электронная почта"
							InputClassName="bg-input_bg pr-28"
							postfix={
								<p className="absolute right-6 top-1/2 -translate-y-1/2 z-10 text-gray">
									@tynda.kg
								</p>
							}
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

				{selectedStaff && (
					<div className="p-3 w-full flex justify-center">
						<ImgUploader
							onChange={onImageChange}
							circle
							size="lg"
							defaultValue={selectedStaff.avatar || ''}
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
			</form>
		</Form>
	);
};

export default StaffForm;
