import CustomInput from '@/components/ui/customInput';
import { Button } from '@components';

const MainInfoBlock = () => {
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
						<CustomInput className="w-52" placeholder="Тип" name="category" />
						<CustomInput className="w-52" placeholder="Адрес" name="address" />
					</div>

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
