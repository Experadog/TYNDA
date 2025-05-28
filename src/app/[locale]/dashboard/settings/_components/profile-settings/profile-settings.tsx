import { Button, CustomFormField, Form, ImgUploader } from '@components';
import { useSettingContext } from '../../context/settings-context-provider';
import BlockWrapper from '../block-wrapper/block-wrapper';

const ProfileSettings = () => {
	const {
		profile_settings: {
			states: { schema, avatar },
			actions: { onSubmit, onImageChange, onReset },
		},
	} = useSettingContext();

	return (
		<BlockWrapper title="Настройки профиля">
			<div className="flex w-full justify-start gap-5 items-stretch">
				<div>
					<ImgUploader defaultValue={avatar || ''} onChange={onImageChange} size="lg" />
				</div>

				<div className="flex flex-col w-full">
					<Form {...schema}>
						<form
							onSubmit={schema.handleSubmit(onSubmit)}
							className="flex flex-col gap-4 w-full h-full"
						>
							<CustomFormField
								control={schema.control}
								placeholder="Имя"
								name="first_name"
								type="text"
							/>
							<CustomFormField
								control={schema.control}
								placeholder="Фамилия"
								name="last_name"
								type="text"
								showError
							/>

							<CustomFormField
								control={schema.control}
								placeholder="Номер телефона"
								name="phone"
								type="tel"
								showError
							/>

							<div className="flex items-center justify-end gap-5">
								<Button
									variant={'yellow'}
									disableAnimation
									className="p-5 mt-auto rounded-xl"
									onClick={onReset}
									disabled={!schema.formState.isDirty}
								>
									Сбросить
								</Button>
								<Button
									variant={'yellow'}
									disableAnimation
									className="p-5 mt-auto rounded-xl"
									type="submit"
									disabled={!schema.formState.isDirty}
								>
									Сохранить
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</BlockWrapper>
	);
};

export default ProfileSettings;
