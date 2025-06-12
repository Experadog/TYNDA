import { type SupportedLanguages, supportedLanguages } from '@/i18n/routing';
import { renderIconByValidationStatus } from '@/lib';
import type { TariffTranslations } from '@business-entities';
import type { TariffSchema } from '@common';
import { Button } from '@components';
import clsx from 'clsx';

type Props = {
	activeLanguage: SupportedLanguages;
	onSwitch: (lang: SupportedLanguages) => void;
	schema: TariffSchema;
	scope: keyof TariffTranslations;
};

const SwitchInputLocale = ({ activeLanguage, onSwitch, schema, scope }: Props) => {
	return (
		<div className="flex items-center gap-2">
			{Object.values(supportedLanguages).map((lang) => {
				return (
					<div key={lang} className="flex items-center gap-1">
						<Button
							type="button"
							onClick={() => onSwitch(lang)}
							variant="link"
							disableAnimation
							className={clsx(
								'h-7 px-2 text-sm font-medium uppercase rounded-md hover:text-orange',
								activeLanguage === lang && 'text-orange underline',
							)}
						>
							{lang}
						</Button>
						{renderIconByValidationStatus(schema, [`translates.${lang}.${scope}`])}
					</div>
				);
			})}
		</div>
	);
};

export default SwitchInputLocale;
