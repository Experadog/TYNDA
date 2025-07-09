import CustomCheckbox from '@/components/ui/custom-checkbox';
import { useViewModel } from '@/i18n/getTranslate';
import { DISTANCES, REGIONS, priceFormatter } from '@/lib';
import { Button, DualRangeSlider, Translate } from '@components';
import { ArrowLeft } from 'lucide-react';
import { CgClose } from 'react-icons/cg';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { formatDistance } from '../../_helpers';
import { useEstFilterUseCase } from '../../use-cases/filter/useEstFilterUseCase';

type Props = {
	isOpen: boolean;
	onOpenChange: () => void;
	userCoords: [number, number] | null;
};

const EstFilterBlock = ({ isOpen, onOpenChange, userCoords }: Props) => {
	const { regions } = useViewModel(['Shared']);

	const {
		handleSelectDistance,
		handleSelectRegion,
		handleSortChange,
		isRegionSelected,
		onSubmit,
		selectedDistance,
		averageBillRange,
		setDiscountOnly,
		discountOnly,
		averageBillSortValue,
		discountSortValue,
		setAverageBillRange,
		resetFilters,
	} = useEstFilterUseCase({ userCoords });

	const onApplyParams = () => {
		onSubmit();
		onOpenChange();
	};

	const onResetParams = () => {
		resetFilters();
		onOpenChange();
	};

	return (
		<Translate
			direction="right"
			distance={200}
			open={isOpen}
			className="absolute z-[999] w-full h-full bg-background_7 left-0 top-0 flex flex-col"
			animateOnce
			onExit={{ direction: 'right' }}
		>
			<div className="flex items-center justify-between p-4 border-b border-b-light_gray  bg-background_7">
				<Button
					size="icon"
					className="rounded-full shadow-none"
					disableAnimation
					onClick={onOpenChange}
				>
					<ArrowLeft className="text-foreground_1" />
				</Button>
				<h2 className="text-lg font-semibold text-foreground_1">Фильтры</h2>
				<div className="w-10" />
			</div>

			<div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 text-sm bg-background_2">
				<div className="space-y-2">
					<h3 className="text-foreground_1 font-medium">Средний чек</h3>
					<DualRangeSlider
						min={200}
						max={50000}
						step={10}
						value={
							averageBillRange
								? [averageBillRange[0] || 200, averageBillRange[1] || 50000]
								: undefined
						}
						onValueChange={setAverageBillRange}
						label={(val) => <span>{priceFormatter(String(val), 'с')}</span>}
						labelPosition="bottom"
						activeLabel={false}
						sliderBg="bg-light_gray"
						thumbRing="bg-background_1"
					/>
				</div>

				<div className="space-y-2">
					<h3 className="text-foreground_1 font-medium">Радиус поиска</h3>
					<div className="flex flex-wrap gap-2">
						{DISTANCES.map((value) => (
							<Button
								key={value}
								variant={selectedDistance === value ? 'yellow' : 'outline'}
								className="rounded-full px-4 py-1 text-sm border-light_gray"
								disableAnimation
								onClick={() => handleSelectDistance(value)}
							>
								{formatDistance(value, 'км', 'м', true)}
								{selectedDistance === value && <CgClose className="ml-1 size-4" />}
							</Button>
						))}
					</div>
				</div>

				<div className="space-y-2">
					<h3 className="text-foreground_1 font-medium">Регион</h3>
					<div className="flex flex-wrap gap-2">
						{Object.values(REGIONS).map((region) => (
							<Button
								key={region}
								variant={isRegionSelected(region) ? 'yellow' : 'outline'}
								className="rounded-full px-4 py-1 text-sm border-light_gray"
								disableAnimation
								onClick={() => handleSelectRegion(region)}
							>
								{regions[region]}
								{isRegionSelected(region) && <CgClose className="ml-1 size-4" />}
							</Button>
						))}
					</div>
				</div>

				<div className="space-y-2 border-t border-t-light_gray pt-4">
					<h3 className="text-foreground_1 font-medium">Сортировка</h3>
					<div className="flex flex-wrap gap-2">
						<Button
							disableAnimation
							variant={typeof discountSortValue === 'number' ? 'yellow' : 'outline'}
							className="rounded-full px-3 py-1 text-sm border-light_gray flex items-center"
							onClick={() => handleSortChange('sort_by_discount')}
						>
							Скидка
							{typeof discountSortValue === 'number' &&
								(discountSortValue === 1 ? (
									<FaArrowUp className="ml-1 size-3" />
								) : (
									<FaArrowDown className="ml-1 size-3" />
								))}
						</Button>

						<Button
							disableAnimation
							variant={
								typeof averageBillSortValue === 'number' ? 'yellow' : 'outline'
							}
							className="rounded-full px-3 py-1 text-sm border-light_gray flex items-center"
							onClick={() => handleSortChange('sort_by_average_bill')}
						>
							Средний чек
							{typeof averageBillSortValue === 'number' &&
								(averageBillSortValue === 1 ? (
									<FaArrowUp className="ml-1 size-3" />
								) : (
									<FaArrowDown className="ml-1 size-3" />
								))}
						</Button>
					</div>
				</div>

				<div className="space-y-2 border-t border-light_gray pt-4">
					<h3 className="text-foreground_1 font-medium">Доп. параметры</h3>
					<CustomCheckbox
						className="text-yellow"
						name="has_discount"
						label="Только со скидкой"
						checked={discountOnly || false}
						onChange={setDiscountOnly}
					/>
				</div>
			</div>

			<div className="p-4 border-t border-light_gray flex gap-3 bg-background_7">
				<Button
					className="w-full"
					disableAnimation
					onClick={onResetParams}
					variant="outline"
				>
					Сброс
				</Button>
				<Button
					className="w-full"
					disableAnimation
					onClick={onApplyParams}
					variant="yellow"
				>
					Применить
				</Button>
			</div>
		</Translate>
	);
};

export default EstFilterBlock;
