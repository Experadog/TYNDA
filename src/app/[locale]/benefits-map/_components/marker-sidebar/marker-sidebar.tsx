'use client';

import type { EstablishmentListItem, UserCoords } from '@business-entities';
import type { UsePaginationType } from '@common';
import CategoriesBlock from '../blocks/categories-block';
import EstFilterBlock from '../blocks/est-filter-block';
import EstablishmentBlock from '../blocks/establishments-block';
import SearchBlock from '../blocks/search-block';

type Props = {
	pagination: UsePaginationType<EstablishmentListItem>;
	searchValue: string;
	onChange: (value: string) => void;
	onOpenChangeFilter: () => void;
	isFilterOpen: boolean;
	userCoords: UserCoords | null;
};

const MarkerSidebar = ({
	pagination,
	onChange,
	searchValue,
	isFilterOpen,
	userCoords,
	onOpenChangeFilter,
}: Props) => {
	return (
		<div className="full-static-height top-0 bottom-0 z-[999] bg-background_7 max-w-[30%] w-full border-r border-r-light_gray relative">
			<div className="flex flex-col h-full w-full py-3 gap-5">
				<div className="w-full px-3">
					<SearchBlock
						searchValue={searchValue}
						onChange={onChange}
						onOpenChangeFilter={onOpenChangeFilter}
					/>
				</div>

				<div className="w-full relative">
					<div className="absolute left-0 top-0 h-full w-12 z-10 pointer-events-none bg-gradient-to-r from-background_7 to-transparent" />
					<CategoriesBlock />
					<div className="absolute right-0 top-0 h-full w-12 z-10 pointer-events-none bg-gradient-to-l from-background_7 to-transparent" />
				</div>

				<div className="relative flex-1 min-h-0 px-3">
					<EstablishmentBlock pagination={pagination} />
				</div>

				<EstFilterBlock
					isOpen={isFilterOpen}
					onOpenChange={onOpenChangeFilter}
					userCoords={userCoords}
				/>
			</div>
		</div>
	);
};

export default MarkerSidebar;
