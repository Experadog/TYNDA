import { switchTheme } from '@common';
import { Label, Switch } from '@components';
import { Moon, Sun } from 'lucide-react';

const ThemeController = ({ theme }: { theme?: Theme }) => {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				{theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
				<Label className="text-foreground_1">Темная тема</Label>
			</div>
			<Switch
				activeBg="bg-orange"
				checked={theme === 'dark'}
				onCheckedChange={(val) => switchTheme(val ? 'dark' : 'light')}
			/>
		</div>
	);
};

export default ThemeController;
