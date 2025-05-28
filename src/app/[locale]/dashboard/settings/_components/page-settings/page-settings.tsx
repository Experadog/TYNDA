import { useThemeContext } from '@/providers/theme/theme-provider';
import { setDefaultSettings } from '../../../page-settings-actions';
import { useSettingContext } from '../../context/settings-context-provider';

import { Button } from '@/components/ui/button';
import { Separator } from '@radix-ui/react-select';
import { Eraser } from 'lucide-react';
import BlockWrapper from '../block-wrapper/block-wrapper';
import BorderRadiusController from './controllers/border-radius-controller';
import FontsizeController from './controllers/fontsize-controller';
import GrayscaleController from './controllers/grayscale-controller';
import LinkUnderlineController from './controllers/link-underline-controller';
import ThemeController from './controllers/theme-controller';

const PageSettings = () => {
	const { theme } = useThemeContext();
	const {
		page_settings: { fontSize, isGrayscale, isUnderlineLinks, borderRadius },
	} = useSettingContext();

	const resetSettings = async () => {
		await setDefaultSettings();
	};

	return (
		<BlockWrapper title="Настройки отображения">
			<ThemeController theme={theme} />
			<GrayscaleController isGrayscale={isGrayscale} />
			<LinkUnderlineController isUnderlineLinks={isUnderlineLinks} />
			<Separator />

			<FontsizeController fontSize={fontSize} />
			<Separator />

			<BorderRadiusController borderRadius={borderRadius} />
			<Separator />

			<Button
				onClick={resetSettings}
				className="self-start gap-2 hover:bg-orange hover:text-white  shadow-none border border-light_gray"
				disableAnimation
			>
				<Eraser size={16} />
				Сбросить настройки
			</Button>
		</BlockWrapper>
	);
};

export default PageSettings;
