import { TIMES } from '@/lib';
import type { Control, FieldValues, Path } from 'react-hook-form';
import CustomSelect from './customSelect';

type Props<T extends FieldValues> = {
	control: Control<T>;
	name: [Path<T>, Path<T>];
};

const CustomTimeRangePicker = <T extends FieldValues>({ control, name }: Props<T>) => {
	const selectionData = TIMES.map((value) => ({ value, label: value }));

	return (
		<div className="bg-background_1 flex-col rounded-xl flex gap-2 w-full">
			<p className="flex-shrink-0 font-roboto">Рабочие часы</p>
			<div className="flex items-start w-full gap-3">
				<CustomSelect
					data={selectionData}
					name={name[0]}
					placeholder="Начало"
					className="py-3.5"
					control={control}
				/>

				<CustomSelect
					data={selectionData}
					name={name[1]}
					placeholder="Конец"
					className="py-3.5"
					control={control}
				/>
			</div>
		</div>
	);
};

export default CustomTimeRangePicker;
