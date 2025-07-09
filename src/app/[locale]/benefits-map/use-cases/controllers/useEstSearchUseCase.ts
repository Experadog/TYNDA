import { useDebounce, useSetParams } from '@common';
import { useEffect, useState } from 'react';

export function useEstSearchUseCase(delay = 300) {
	const [searchValue, setSearchValue] = useState('');

	const { setParam, removeParam } = useSetParams();

	const debouncedSearchValue = useDebounce(searchValue, delay);

	const handleSearch = (value: string) => {
		setSearchValue(value);
	};

	useEffect(() => {
		if (!debouncedSearchValue) {
			removeParam('search_name');
			return;
		}

		setParam('search_name', debouncedSearchValue);
	}, [debouncedSearchValue, setParam]);

	return {
		searchValue,
		debouncedSearchValue,
		handleSearch,
	};
}
