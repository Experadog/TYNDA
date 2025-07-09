import type { UserCoords } from '@business-entities';
import {
	type Params,
	type REGION_KEY,
	type SortVariant,
	pushCommonToast,
	useSetParams,
} from '@common';
import { useCallback, useMemo, useState } from 'react';

export function useEstFilterUseCase({ userCoords }: { userCoords: UserCoords | null }) {
	const { setParams, getParams, removeParams } = useSetParams();

	const [
		initialRegion,
		initialAverageBillSort,
		initialDiscountSort,
		maxBill,
		minBill,
		initialDiscountOnly = null,
		initialSelectedDistance = null,
	] = useMemo(() => {
		const {
			region,
			sort_by_average_bill,
			sort_by_discount,
			max_average_bill,
			min_average_bill,
			has_discount,
			from_user_distance_in_meter,
		} = getParams([
			'region',
			'sort_by_average_bill',
			'sort_by_discount',
			'min_average_bill',
			'max_average_bill',
			'has_discount',
			'from_user_distance_in_meter',
		]);

		return [
			region,
			sort_by_average_bill,
			sort_by_discount,
			max_average_bill,
			min_average_bill,
			has_discount,
			from_user_distance_in_meter,
		];
	}, [getParams]);

	const [averageBillRange, setAverageBillRange] = useState<Array<number | undefined>>([
		minBill,
		maxBill,
	]);
	const [selectedDistance, setSelectedDistance] = useState<number | null>(
		initialSelectedDistance,
	);
	const [selectedRegion, setSelectedRegion] = useState<REGION_KEY | null>(
		initialRegion as REGION_KEY | null,
	);
	const [discountOnly, setDiscountOnly] = useState<boolean | null>(initialDiscountOnly);

	const [averageBillSortValue, setAverageBillSortValue] = useState<SortVariant | undefined>(
		initialAverageBillSort,
	);
	const [discountSortValue, setDiscountSortValue] = useState<SortVariant | undefined>(
		initialDiscountSort,
	);

	const handleSelectDistance = useCallback((value: number) => {
		setSelectedDistance((prev) => (prev === value ? null : value));
	}, []);

	const handleSelectRegion = useCallback((region: REGION_KEY) => {
		setSelectedRegion((prev) => (prev === region ? null : region));
	}, []);

	const isRegionSelected = useCallback(
		(region: REGION_KEY) => selectedRegion === region,
		[selectedRegion],
	);
	const handleSortChange = useCallback(
		(key: Extract<keyof Params, 'sort_by_average_bill' | 'sort_by_discount'>) => {
			const toggleSort = (prev: number | undefined) =>
				prev === undefined ? 1 : prev === 1 ? -1 : undefined;

			if (key === 'sort_by_average_bill') {
				setAverageBillSortValue(toggleSort);
				setDiscountSortValue(undefined);
			} else {
				setDiscountSortValue(toggleSort);
				setAverageBillSortValue(undefined);
			}
		},
		[],
	);

	const onSubmit = useCallback(() => {
		if (!userCoords && selectedDistance) {
			pushCommonToast('Местоположение недоступно. Проверьте доступ в настройках.', 'info', {
				removeDelay: 3000,
				icon: 'ℹ️',
			});

			removeParams(['from_user_distance_in_meter']);
			setSelectedDistance(null);

			return;
		}

		setParams({
			region: selectedRegion || undefined,
			sort_by_average_bill: averageBillSortValue,
			sort_by_discount: discountSortValue,
			max_average_bill: averageBillRange[1],
			min_average_bill: averageBillRange[0],
			has_discount: discountOnly || undefined,
			from_user_distance_in_meter: selectedDistance || undefined,
			lat: selectedDistance && userCoords ? userCoords[0] : undefined,
			lon: selectedDistance && userCoords ? userCoords[1] : undefined,
		});
	}, [
		setParams,
		selectedRegion,
		averageBillSortValue,
		discountSortValue,
		averageBillRange,
		discountOnly,
		selectedDistance,
	]);

	const resetFilters = useCallback(() => {
		setSelectedRegion(null);
		setSelectedDistance(null);
		setDiscountOnly(false);
		setAverageBillRange([]);
		setAverageBillSortValue(undefined);
		setDiscountSortValue(undefined);

		removeParams([
			'region',
			'sort_by_average_bill',
			'sort_by_discount',
			'min_average_bill',
			'max_average_bill',
			'has_discount',
			'from_user_distance_in_meter',
			'lat',
			'lon',
		]);
	}, [removeParams]);

	return {
		averageBillRange,
		selectedRegion,
		selectedDistance,
		handleSelectDistance,
		handleSelectRegion,
		isRegionSelected,
		handleSortChange,
		onSubmit,
		discountSortValue,
		averageBillSortValue,
		discountOnly,
		setAverageBillRange,
		setDiscountOnly,
		resetFilters,
	};
}
