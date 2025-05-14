'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from '@/providers/locale/locale-provider';
import { useParams } from 'next/navigation';
import { startTransition } from 'react';
import { GrLanguage } from 'react-icons/gr';

const ToggleLocale = () => {
	const { locale } = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const params = useParams();

	const onToggle = async () => {
		const newLocale = locale === 'ru' ? 'kg' : 'ru';
		startTransition(() => {
			router.replace({ pathname, ...params }, { locale: newLocale });
		});
	};

	return (
		<div
			className="flex items-center gap-2 cursor-pointer hover:text-yellow"
			onClick={onToggle}
		>
			<GrLanguage size={'1.2rem'} />
			<span className="font-semibold uppercase">{locale}</span>
		</div>
	);
};

export default ToggleLocale;
