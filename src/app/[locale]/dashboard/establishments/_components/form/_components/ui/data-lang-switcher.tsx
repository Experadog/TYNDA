import { type SupportedLanguages, supportedLanguages } from '@/i18n/routing';
import { renderIconByValidationStatus } from '@/lib';
import type { EstablishmentSchema } from '@common';
import { Button } from '@components';

type Props = {
	activeLanguage: SupportedLanguages;
	onSwitch: (lang: SupportedLanguages) => void;
	schema: EstablishmentSchema;
	scope: 'name' | 'description';
};

const DataLangSwitcher = ({ activeLanguage, onSwitch, schema, scope }: Props) => {
	return (
		<div className="flex items-center gap-3 flex-wrap">
			{Object.values(supportedLanguages).map((value) => (
				<Button
					key={value}
					className={`
						uppercase font-medium text-sm px-5 py-2 rounded-xl transition-all duration-300
						border border-light_gray shadow-sm 
						${
							activeLanguage === value
								? 'bg-background_6 shadow-md'
								: 'bg-background_2 text-foreground_1 hover:bg-background_3'
						}
					`}
					type="button"
					onClick={() => onSwitch(value)}
					variant="ghost"
				>
					{value}

					{renderIconByValidationStatus(schema, [
						scope === 'description'
							? `translates.${value}.description`
							: `translates.${value}.name`,
					])}
				</Button>
			))}
		</div>
	);
};

export default DataLangSwitcher;
