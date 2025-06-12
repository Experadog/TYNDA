'use client';

import { useViewModel } from '@/i18n/getTranslate';
import { Link } from '@/i18n/routing';
import { PAGES } from '@/lib';
import { UserRole } from '@business-entities';
import { Translate } from '@components';
import RegisterClientForm from '../_components/register-client-form';
import RegisterDialog from '../_components/register-dialog';
import RegisterPartnerForm from '../_components/register-establisher-form';
import RegisterSwitcher from '../_components/register-switcher';
import { useRegisterUseCase } from '../use-case/useRegisterUseCase';

const RegisterView = () => {
	const { states, actions } = useRegisterUseCase();
	const { role } = states;
	const { onChangeRole } = actions;

	const { Register } = useViewModel(['Auth']);

	return (
		<div className="flex flex-col gap-8 xs:gap-3">
			<Translate direction="right" distance={100}>
				<div className="flex flex-col gap-3">
					<h1 className="text-white text-2xl font-semibold">{Register.title}</h1>
					<span className="text-shade_gray">
						{Register.has_account}
						<Link href={PAGES.LOGIN} className="text-yellow font-semibold ml-2 xs:ml-0">
							{Register.login}
						</Link>
					</span>
				</div>
				<Translate direction="right" distance={100} key={role}>
					{role === UserRole.CLIENT && <RegisterClientForm />}
					{role === UserRole.ESTABLISHER && <RegisterPartnerForm />}
				</Translate>
			</Translate>

			<Translate direction="up" distance={150} duration={1.3}>
				<RegisterSwitcher onChangeRole={onChangeRole} role={role} />
			</Translate>

			<RegisterDialog />
		</div>
	);
};

export default RegisterView;
