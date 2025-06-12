'use client';

import InfoForm from '../_components/info-form';
import PhoneVerificationDialog from '../_components/phone-verification/phone-verification-dialog';

const UpdateProfileInfoView = () => {
	return (
		<div className="flex flex-col gap-12  w-full p-5">
			<p className="text-foreground_1 font-semibold text-2xl">Личные данные</p>

			<p className="text-foreground_2 font-semibold text-xl">Информация об аккаунте</p>

			<InfoForm />
			<PhoneVerificationDialog />
		</div>
	);
};

export default UpdateProfileInfoView;
