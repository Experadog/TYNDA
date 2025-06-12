import { setBorderRadius } from '@/app/[locale]/dashboard/settings';
import type { PageSettings } from '@common';
import { Label, RadioGroup, RadioGroupItem } from '@components';
import { TbBorderCornerRounded } from 'react-icons/tb';

const BorderRadiusController = ({
	borderRadius,
}: { borderRadius: PageSettings['borderRadius'] }) => {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-2">
				<TbBorderCornerRounded size={18} />
				<Label className="text-foreground_1">Округление краев</Label>
			</div>

			<RadioGroup
				key={borderRadius}
				defaultValue={borderRadius}
				onValueChange={(val) => setBorderRadius(val as PageSettings['borderRadius'])}
				className="flex gap-4"
			>
				<div className="flex items-center gap-1">
					<RadioGroupItem value="none" id="radius-none" />
					<Label htmlFor="radius-none">Без скругления</Label>
				</div>
				<div className="flex items-center gap-1">
					<RadioGroupItem value="medium" id="radius-medium" />
					<Label htmlFor="radius-medium">Обычное</Label>
				</div>
				<div className="flex items-center gap-1">
					<RadioGroupItem value="large" id="radius-large" />
					<Label htmlFor="radius-large">Большое</Label>
				</div>
			</RadioGroup>
		</div>
	);
};

export default BorderRadiusController;
