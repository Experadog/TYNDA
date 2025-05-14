'use client';

import { openStreetMapSearch } from '@/services/external/externalService';
import type { ExternalEntities } from '@business-entities';
import { useDebounce } from '@common';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { LoadingSpinner } from '../ui/loading-spinner';

type Props = {
	onSelect: (coords: [number, number]) => void;
	className?: string;
	isMarked: boolean;
};

const SearchControl = ({ onSelect, className, isMarked }: Props) => {
	const [query, setQuery] = useState('');
	const [suggestions, setSuggestions] = useState<ExternalEntities['OpenStreetMapDataItem'][]>([]);
	const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const searchRef = useRef<HTMLInputElement>(null);

	const debouncedQuery = useDebounce(query, 300);

	useEffect(() => {
		if (!debouncedQuery.trim() || isMarked) {
			setSuggestions([]);
			return;
		}

		const fetchSuggestions = async () => {
			setIsLoading(true);
			try {
				const response = await openStreetMapSearch(debouncedQuery);
				setSuggestions(response);
			} catch (error) {
				console.error('Error fetching suggestions', error);
				setSuggestions([]);
			} finally {
				setIsLoading(false);
			}
		};

		fetchSuggestions();
	}, [debouncedQuery, isMarked]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
		setIsSuggestionsOpen(true);
	};

	const handleSelect = (suggestion: ExternalEntities['OpenStreetMapDataItem']) => {
		const coords: [number, number] = [
			Number.parseFloat(suggestion.lat),
			Number.parseFloat(suggestion.lon),
		];

		setQuery(suggestion.display_name);
		setSuggestions([]);
		setIsSuggestionsOpen(false);
		onSelect(coords);
	};

	return (
		<div className={className}>
			<input
				ref={searchRef}
				value={isMarked ? 'Поставлена метка' : query}
				onChange={handleChange}
				disabled={isMarked}
				onFocus={() => setIsSuggestionsOpen(true)}
				onBlur={() => setTimeout(() => setIsSuggestionsOpen(false), 200)}
				className="bg-input_bg w-full border border-light_gray px-3 py-2 rounded-xl outline-none font-base text-sm text-foreground_1 disabled:cursor-not-allowed"
				placeholder="Поиск места..."
			/>

			{isSuggestionsOpen && (
				<div className="absolute mt-1 w-full bg-background_1 border-2 border-light_gray rounded-lg shadow-lg z-[10000] max-h-60 overflow-y-auto">
					{isLoading ? (
						<div className="flex justify-center items-center py-4">
							<LoadingSpinner />
						</div>
					) : suggestions.length > 0 ? (
						suggestions.map((suggestion, index) => (
							<div
								key={suggestion.place_id}
								className={clsx(
									'px-3 py-2 hover:bg-yellow hover:text-white transition-colors cursor-pointer text-sm text-gray-800',
									index !== suggestions.length - 1 &&
										'border-b border-light_gray',
								)}
								onMouseDown={(e) => {
									e.preventDefault();
									handleSelect(suggestion);
								}}
							>
								<p className="line-clamp-2 leading-snug break-words text-sm">
									{suggestion.display_name}
								</p>
							</div>
						))
					) : (
						<div className="px-3 py-4 text-center text-sm text-gray">
							Ничего не найдено
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default SearchControl;
