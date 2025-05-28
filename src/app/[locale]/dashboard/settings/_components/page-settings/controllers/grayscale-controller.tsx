import { switchGrayscale } from '@/app/[locale]/dashboard/page-settings-actions';
import { Label, Switch } from '@components';
import { EyeOff } from 'lucide-react';

const GrayscaleController = ({ isGrayscale }: { isGrayscale: boolean }) => {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<EyeOff size={18} />
				<Label className="text-foreground_1">Черно-белый режим</Label>
			</div>
			<Switch activeBg="bg-orange" checked={isGrayscale} onCheckedChange={switchGrayscale} />
		</div>
	);
};

export default GrayscaleController;
