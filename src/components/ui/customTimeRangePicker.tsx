import { TIMES } from '@/lib';
import { useState } from 'react';
import CustomSelect from './customSelect';

const CustomTimeRangePicker = () => {
	const [startTime, setStartTime] = useState<string>(TIMES[0]);
	const [endTime, setEndTime] = useState<string>(TIMES[TIMES.length - 1]);

	const selectionData = TIMES.map((value) => ({ value, label: value }));

	return (
		<div className="bg-background_1 flex-col  rounded-xl flex gap-2 w-full">
			<p className="flex-shrink-0 font-roboto">Рабочие часы</p>
			<div className="flex items-center w-full gap-2">
				<CustomSelect
					data={selectionData}
					name="start_time"
					placeholder="Начало"
					className="bg-input_bg py-3"
				/>

				<CustomSelect
					data={selectionData}
					name="start_time"
					placeholder="Конец"
					className="bg-input_bg py-3"
				/>
			</div>
		</div>
	);
};

export default CustomTimeRangePicker;
