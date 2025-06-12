'use client';

import { useViewModel } from '@/i18n/getTranslate';
import { Link } from '@/i18n/routing';
import { PAGES } from '@/lib';
import { Fade, Translate } from '@components';
import type { FC } from 'react';
import LoginForm from '../_components/login-form';
import LoginVia from '../_components/login-via';

const LoginView: FC = () => {
	const { Login } = useViewModel(['Auth']);

	return (
		<div className="flex flex-col xs:text-sm">
			<Translate direction="right" distance={100}>
				<div className="flex flex-col gap-3">
					<h1 className="text-white text-2xl font-semibold">{Login.title}</h1>
					<span className="text-shade_gray">
						{Login.no_account}{' '}
						<Link href={PAGES.REGISTER} className="text-yellow font-semibold ml-2">
							{Login.register}
						</Link>
					</span>
				</div>

				<LoginForm />
			</Translate>

			<Fade duration={2}>
				<div className="flex items-center gap-4">
					<div className="flex-1 bg-shade_gray h-[1px] rounded-md" />
					<span className="text-shade_gray">{Login.or}</span>
					<div className="flex-1 bg-shade_gray h-[1px] rounded-md" />
				</div>
			</Fade>

			<Translate direction="up" distance={150} duration={1.3}>
				<LoginVia />
			</Translate>
		</div>
	);
};

export default LoginView;
