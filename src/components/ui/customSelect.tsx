import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './select';

type SelectItemType = {
	value: string;
	label: string;
};

type Props = {
	placeholder: string;
	className?: string;
	data: Array<SelectItemType>;
	name: string;
};

const CustomSelect = ({ placeholder, className, data, name }: Props) => {
	return (
		<Select name={name}>
			<SelectTrigger
				className={`outline-none border border-light_gray numeric h-full shadow-none rounded-xl bg-input_bg font-semibold ${className}`}
			>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent className="bg-background_1 border border-input_bg max-h-52 overflow-y-scroll">
				<SelectGroup>
					{data.map((item) => (
						<SelectItem
							key={item.value}
							value={item.value}
							className="hover:bg-light_gray cursor-pointer font-semibold numeric"
						>
							{item.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default CustomSelect;
