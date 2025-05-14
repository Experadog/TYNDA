import { type SupportedLanguages, supportedLanguages } from '@/i18n/routing';
import { Button } from '@components';

type Props = {
	activeLanguage: SupportedLanguages;
	onSwitch: (lang: SupportedLanguages) => void;
};

const DataLangSwitcher = ({ activeLanguage, onSwitch }: Props) => {
	return (
		<div className="flex items-center gap-3">
			{Object.values(supportedLanguages).map((value) => (
				<Button
					key={value}
					className="border font-roboto shadow-none border-light_gray uppercase p-1 px-6 text-sm rounded-xl"
					type="button"
					onClick={() => onSwitch(value)}
					variant={activeLanguage === value ? 'yellow' : 'default'}
				>
					{value}
				</Button>
			))}
		</div>
	);
};

export default DataLangSwitcher;
