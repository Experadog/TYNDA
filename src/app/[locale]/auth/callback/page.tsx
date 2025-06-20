'use client';

import { useLocale } from '@/providers/locale/locale-provider';
import { Avatar, LoadingSpinner, Translate } from '@components';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useLoginUseCase } from '../login/use-case/useLoginUseCase';

const Callback = () => {
	const { onSendGoogleCode } = useLoginUseCase();
	const params = useSearchParams();
	const { locale } = useLocale();

	useEffect(() => {
		if (!params) return;

		const code = params.get('code');
		if (code) {
			setTimeout(() => {
				onSendGoogleCode({ code, locale });
			}, 2000);
		}
	}, [params, locale]);

	return (
		<Translate direction="up" animateOnce className="flex flex-col gap-3 items-center">
			<Avatar src={'/logo.svg'} size="large" />
			<h3 className="text-foreground_1 text-2xl font-semibold">Tynda KG</h3>
			<h4 className="text-foreground_2 text-md font-normal">Идет авторизация...</h4>
			<LoadingSpinner className="size-5 text-yellow" />
		</Translate>
	);
};

export default Callback;
