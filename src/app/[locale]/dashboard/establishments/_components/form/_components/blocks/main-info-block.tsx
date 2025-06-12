'use client';

import { ESTABLISHMENTS_CATEGORIES } from '@/business-entities/establishment/EstablishmentEntity';
import CustomSelect from '@/components/ui/customSelect';
import CustomTimeRangePicker from '@/components/ui/customTimeRangePicker';
import type { SupportedLanguages } from '@/i18n/routing';
import { renderIconByValidationStatus } from '@/lib';
import type { EstablishmentSchema } from '@common';
import { CustomFormField } from '@components';
import { type ReactNode, useState } from 'react';
import DataLangSwitcher from '../ui/data-lang-switcher';

type Props = {
	categoriesViewModel: ViewModel['Shared']['establishment_categories'];
	schema: EstablishmentSchema;
};

const MainInfoBlock = ({ categoriesViewModel, schema }: Props) => {
	const [nameActiveLang, setNameActiveLang] = useState<SupportedLanguages>('ru');
	const [descriptionActiveLang, setDescriptionActiveLang] = useState<SupportedLanguages>('ru');

	const inputClassName =
		'bg-input_bg font-base placeholder:font-base rounded-xl border border-light_gray';

	return (
		<div className="flex flex-col gap-7">
			<div className="flex gap-10">
				<div className="flex flex-col gap-5 w-full">
					{ItemBlock(
						<div className="flex flex-col justify-between gap-3">
							<DataLangSwitcher
								onSwitch={(lang) => setNameActiveLang(lang)}
								activeLanguage={nameActiveLang}
								scope="name"
								schema={schema}
							/>

							<CustomFormField
								placeholder="Название"
								key={nameActiveLang}
								control={schema.control}
								name={`translates.${nameActiveLang}.name`}
								type="text"
								InputClassName={
									'bg-input_bg font-semibold py-7 w-full rounded-xl border border-light_gray'
								}
							/>
						</div>,
						<span>
							{renderIconByValidationStatus(schema, [
								'translates.en.name',
								'translates.ru.name',
								'translates.kg.name',
							])}
						</span>,
					)}

					{ItemBlock(
						<div className="flex items-start gap-3 w-full">
							<CustomSelect
								data={Object.values(ESTABLISHMENTS_CATEGORIES).map((value) => ({
									label: categoriesViewModel[value],
									value,
								}))}
								className="py-3 text-base"
								placeholder="Тип"
								name="category"
								control={schema.control}
							/>

							<CustomFormField
								InputClassName={inputClassName}
								className="w-[50%]"
								placeholder="Адрес"
								control={schema.control}
								type="text"
								name="address"
							/>
						</div>,

						<span>
							{renderIconByValidationStatus(schema, ['category', 'address'])}
						</span>,
					)}
					{ItemBlock(
						<CustomTimeRangePicker
							control={schema.control}
							name={['work_time_start', 'work_time_end']}
						/>,
						<span>
							{renderIconByValidationStatus(schema, [
								'work_time_start',
								'work_time_end',
							])}
						</span>,
					)}

					{ItemBlock(
						<div className="flex flex-col justify-between gap-3 mt-5">
							<DataLangSwitcher
								onSwitch={(lang) => setDescriptionActiveLang(lang)}
								activeLanguage={descriptionActiveLang}
								scope="description"
								schema={schema}
							/>

							<CustomFormField
								key={descriptionActiveLang}
								isTextArea
								placeholder="Описание..."
								name={`translates.${descriptionActiveLang}.description`}
								control={schema.control}
								type="text"
								TextAreaClassName="h-72 w-full bg-input_bg max-h-[600px]"
							/>
						</div>,

						<span>
							{renderIconByValidationStatus(schema, [
								'translates.ru.description',
								'translates.en.description',
								'translates.kg.description',
							])}
						</span>,
					)}

					{ItemBlock(
						<div className="flex items-start gap-3 w-full">
							<CustomFormField
								InputClassName={inputClassName}
								placeholder="Веб-сайт"
								control={schema.control}
								type="url"
								name="website"
							/>

							<CustomFormField
								InputClassName={inputClassName}
								placeholder="Почтовый адрес"
								control={schema.control}
								type="email"
								name="email"
							/>

							<CustomFormField
								InputClassName={inputClassName}
								placeholder="Средний чек"
								control={schema.control}
								type="number"
								name="average_bill"
							/>

							<CustomFormField
								InputClassName={inputClassName}
								placeholder="Скидка"
								control={schema.control}
								type="number"
								name="discount"
								max={100}
							/>
						</div>,

						<span>
							{renderIconByValidationStatus(schema, [
								'website',
								'email',
								'average_bill',
								'discount',
							])}
						</span>,
					)}
				</div>
			</div>
		</div>
	);
};

const ItemBlock = (Input: ReactNode, Icon: ReactNode) => (
	<div className="flex items-center gap-2 w-full">
		<div className="flex-[7]">{Input}</div>
		<div className="flex-[1] flex justify-center">{Icon}</div>
	</div>
);

export default MainInfoBlock;
