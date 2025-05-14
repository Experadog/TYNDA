'use client';
import { useRouter } from '@/i18n/routing';
import { PAGES } from '@/lib';
import { Button } from '@components';
import { BiSolidErrorCircle } from 'react-icons/bi';

const EmptyView = () => {
	const router = useRouter();

	const onNavigateToCreation = () => router.push(PAGES.ESTABLISHMENT_CREATION);

	return (
		<div className="flex items-center justify-center  mt-[25%] -translate-y-[25%] flex-col gap-3">
			<BiSolidErrorCircle size={50} className="text-foreground_1" />
			<p className="text-3xl text-foreground_2 font-semibold ">Предприятий не обнаружено</p>
			<p className="text-sm text-foreground_3 font-normal ">
				Создайте первое предприятие прямо сейчас!
			</p>

			<Button variant={'yellow'} className="" size={'lg'} onClick={onNavigateToCreation}>
				Создать!
			</Button>
		</div>
	);
};

export default EmptyView;
