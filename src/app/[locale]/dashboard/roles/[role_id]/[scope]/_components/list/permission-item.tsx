import { getTranslateByKey } from '@/lib';
import { useLocale } from '@/providers/locale/locale-provider';
import type { Permission } from '@business-entities';
import { Button } from '@components';
import { Settings } from 'lucide-react';

type Props = {
	item: Permission;
	onOpen: () => void;
};

const PermissionItem = ({ item, onOpen }: Props) => {
	const { locale } = useLocale();

	const name = getTranslateByKey(locale, item.translates, 'name');
	const description = getTranslateByKey(locale, item.translates, 'description');

	return (
		<div className="w-[260px] rounded-xl border border-light_gray bg-background_1 p-4 shadow-sm">
			<div className="mb-2 flex items-center justify-between">
				<h3 className="text-sm font-semibold text-foreground_1">{name}</h3>
			</div>
			<p className="text-xs text-gray line-clamp-3 mb-2">{description}</p>

			<div className="flex w-full justify-end">
				<Button
					size={'icon'}
					disableAnimation
					className="bg-orange rounded-full group"
					onClick={onOpen}
					disabled
				>
					<Settings className="text-white group-hover:rotate-180 transition-transform" />
				</Button>
			</div>
		</div>
	);
};

export default PermissionItem;
