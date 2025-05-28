import { switchUnderlineLinks } from '@/app/[locale]/dashboard/page-settings-actions';
import { Label, Switch } from '@components';
import { Link2 } from 'lucide-react';

const LinkUnderlineController = ({ isUnderlineLinks }: { isUnderlineLinks: boolean }) => {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Link2 size={18} />
				<Label className="text-foreground_1">Подчеркивать ссылки</Label>
			</div>
			<Switch
				activeBg="bg-orange"
				checked={isUnderlineLinks}
				onCheckedChange={switchUnderlineLinks}
			/>
		</div>
	);
};

export default LinkUnderlineController;
