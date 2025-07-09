import CustomInput from '@/components/ui/customInput';
import { CiFilter } from 'react-icons/ci';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

type Props = {
	searchValue: string;
	onChange: (value: string) => void;
	onOpenChangeFilter: () => void;
};

const SearchBlock = ({ onChange, searchValue, onOpenChangeFilter }: Props) => {
	return (
		<div className="w-full relative">
			<CustomInput
				className="w-full pl-9"
				placeholder="Поиск..."
				value={searchValue}
				onChange={(e) => onChange(e.target.value)}
			/>
			<HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-placeholder" />

			<CiFilter
				onClick={onOpenChangeFilter}
				className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-foreground_1 hover:text-yellow cursor-pointer"
			/>
		</div>
	);
};

export default SearchBlock;
