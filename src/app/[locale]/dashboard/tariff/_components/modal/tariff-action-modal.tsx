import CustomSelect from '@/components/ui/customSelect';
import { supportedLanguages } from '@/i18n/routing';
import { CardVariants } from '@business-entities';
import type { TariffFormValues } from '@common';
import { CustomFormField, DialogWrapper, Form } from '@components';
import { useRef, useState } from 'react';
import { useTariffContext } from '../../context/tariff-context-provider';
import SwitchInputLocale from './switch-input-locale';

const TariffActionModal = () => {
	const { modal, schema, creation, updating } = useTariffContext();
	const { isOpen, onClose, selectedTariff } = modal;

	const refContainer = useRef<HTMLDivElement | null>(null);
	const title = selectedTariff ? 'Редактировать тариф' : 'Создать тариф';

	const [nameActiveLang, setNameActiveLang] = useState<Locale>(supportedLanguages[0]);
	const [descriptionActiveLang, setDescriptionActiveLang] = useState<Locale>(
		supportedLanguages[0],
	);

	const onSubmit = async (values: TariffFormValues) => {
		if (!selectedTariff) {
			await creation.onCreate(values);
		} else {
			await updating.onUpdate(values, selectedTariff.id);
		}
	};

	return (
		<DialogWrapper
			onClose={onClose}
			isOpen={isOpen}
			action={selectedTariff ? 'update' : 'create'}
			title={title}
			disableSubmit={!schema.formState.isDirty}
			buttonForm="tariff-form"
		>
			<Form {...schema}>
				<form
					id="tariff-form"
					className="w-full flex flex-col gap-4"
					onSubmit={schema.handleSubmit(onSubmit)}
				>
					<div className="flex flex-row gap-3">
						<div ref={refContainer} className="w-full">
							<CustomSelect
								control={schema.control}
								container={refContainer?.current || undefined}
								key={String(isOpen)}
								name="card_type"
								placeholder="Тип карты"
								className="py-3.5 bg-input_bg"
								data={[
									{ label: 'Туристическая', value: CardVariants.TOURIST },
									{ label: 'Патриотическая', value: CardVariants.COMPATRIOT },
								]}
							/>
						</div>
						<CustomFormField
							control={schema.control}
							name="price"
							type="number"
							placeholder="Цена"
							InputClassName="bg-input_bg"
						/>
					</div>

					<div className="flex flex-col gap-2">
						<SwitchInputLocale
							activeLanguage={nameActiveLang}
							onSwitch={setNameActiveLang}
							schema={schema}
							scope="name"
						/>

						<CustomFormField
							control={schema.control}
							name={`translates.${nameActiveLang}.name`}
							type="text"
							key={nameActiveLang}
							placeholder="Название"
							InputClassName="bg-input_bg"
						/>
					</div>

					<div className="flex flex-col gap-2">
						<SwitchInputLocale
							activeLanguage={descriptionActiveLang}
							onSwitch={setDescriptionActiveLang}
							schema={schema}
							scope="description"
						/>

						<CustomFormField
							control={schema.control}
							name={`translates.${descriptionActiveLang}.description`}
							type="text"
							key={descriptionActiveLang}
							placeholder={`- Описание 1
								- Описание 2
								- ...
								`}
							TextAreaClassName="w-full bg-input_bg"
							isTextArea
						/>
					</div>
				</form>
			</Form>
		</DialogWrapper>
	);
};

export default TariffActionModal;
