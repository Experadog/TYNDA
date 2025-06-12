import CredentialsForm from '../_components/credentials-form';

const UpdateProfileCredentialsView = () => {
	return (
		<div className="flex flex-col gap-12 p-5 w-full">
			<p className="text-foreground_1 font-semibold text-2xl">Смена пароля</p>
			<CredentialsForm />
		</div>
	);
};

export default UpdateProfileCredentialsView;
