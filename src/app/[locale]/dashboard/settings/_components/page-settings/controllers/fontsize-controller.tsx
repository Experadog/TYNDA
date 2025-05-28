import { setFontSize } from '@/app/[locale]/dashboard/page-settings-actions';
import type { PageSettings } from '@common';
import { Label, RadioGroup, RadioGroupItem } from '@components';
import { Type } from 'lucide-react';

const FontsizeController = ({ fontSize }: { fontSize: PageSettings['fontSize'] }) => {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-2">
				<Type size={18} />
				<Label className="text-foreground_1">Размер шрифта</Label>
			</div>

			<RadioGroup
				key={fontSize}
				defaultValue={fontSize}
				onValueChange={(val) => setFontSize(val as typeof fontSize)}
				className="flex flex-wrap gap-4 mt-2"
			>
				<div className="flex items-center gap-1">
					<RadioGroupItem activeBg="bg-orange" value="small" id="font-small" />
					<Label htmlFor="font-small">Маленький</Label>
				</div>
				<div className="flex items-center gap-1">
					<RadioGroupItem activeBg="bg-orange" value="medium" id="font-medium" />
					<Label htmlFor="font-medium">Средний</Label>
				</div>
				<div className="flex items-center gap-1">
					<RadioGroupItem activeBg="bg-orange" value="large" id="font-large" />
					<Label htmlFor="font-large">Крупный</Label>
				</div>
			</RadioGroup>
		</div>
	);
};

export default FontsizeController;
