'use client';

import { ESTABLISHMENTS_CATEGORIES } from '@/business-entities/establishment/EstablishmentEntity';
import CustomInput from '@/components/ui/customInput';
import CustomSelect from '@/components/ui/customSelect';
import CustomTimeRangePicker from '@/components/ui/customTimeRangePicker';
import { Button } from '@components';

type Props = {
	categoriesViewModel: ViewModel['Shared']['establishment_categories'];
};

const MainInfoBlock = ({ categoriesViewModel }: Props) => {
	return (
		<div className="flex flex-col gap-7">
			<div className="flex justify-between w-full gap-10">
				<div className="flex flex-col gap-5 flex-[7]">
					<CustomInput
						placeholder="Название"
						name="name"
						className="text-2xl font-semibold placeholder:text-lg placeholder:font-normal"
					/>

					<div className="flex items-center gap-3">
						<CustomSelect
							data={Object.values(ESTABLISHMENTS_CATEGORIES).map((value) => ({
								label: categoriesViewModel[value],
								value,
							}))}
							placeholder="Тип"
							name="category"
						/>
						<CustomInput placeholder="Адрес" name="address" />
					</div>

					<CustomTimeRangePicker />

					<CustomInput
						isTextArea
						placeholder="Описание..."
						name="description"
						className="resize-none h-72"
					/>
				</div>
				<div className="flex-[1]">
					<Button variant={'yellow'} className="rounded-xl p-5">
						Сохранить
					</Button>
				</div>
			</div>
		</div>
	);
};

export default MainInfoBlock;
