'use client';

import { useLocale } from '@/providers/locale/locale-provider';
import { UserRole } from '@business-entities';
import { Fade } from '@components';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useLoginUseCase } from '../login/use-case/useLoginUseCase';

const Callback = () => {
	const { onSendGoogleCode } = useLoginUseCase();
	const params = useSearchParams();
	const { locale } = useLocale();

	useEffect(() => {
		const code = params.get('code') || '';
		onSendGoogleCode({ code, role: UserRole.CLIENT, locale });
	}, []);

	return (
		<div className="fixed inset-0 bg-background_1  flex items-center justify-center p-10">
			<Fade className="flex flex-col gap-1 items-center">
				<span className="text-foreground_1 text-lg">Пожалуйста, подождите</span>
				<span className="text-gray animate-pulse duration-1000">Идет авторизация...</span>
			</Fade>
		</div>
	);
};

export default Callback;
