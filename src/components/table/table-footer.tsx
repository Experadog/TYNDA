import { cn } from '@/lib/utils';
import type { UsePaginationType } from '@common';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

type Props<T extends object> = {
	pagination: UsePaginationType<T>;
	colSpan: number;
};

const TableFooter = <T extends object>({ pagination, colSpan }: Props<T>) => {
	const { states, actions } = pagination;
	const { list, allPages, currentPage, isLoading, isFirstPage, hasNextPage } = states;

	const goToPage = (page: number) => {
		if (page < 1 || page > Object.keys(allPages).length) return;
		actions.setPage(page);
	};

	return (
		<tfoot>
			<tr>
				<td
					colSpan={colSpan}
					className="px-4 py-3 border-t border-light_gray rounded-b-lg font-roboto"
				>
					<div className="flex items-center justify-between w-full">
						<div className="flex items-center gap-2">
							{list.length > 0 &&
								Object.keys(allPages).map((page) => {
									const pageNumber = Number(page);
									const isActive = pageNumber === currentPage;

									return (
										<Button
											key={page}
											onClick={() => goToPage(pageNumber)}
											size="icon"
											className={cn(
												isActive
													? 'bg-orange text-white cursor-default'
													: 'border-light_gray text-foreground_1 hover:bg-gray-100',
											)}
											disabled={isActive || isLoading}
											aria-current={isActive ? 'page' : undefined}
											aria-label={`Перейти на страницу ${page}`}
										>
											{page}
										</Button>
									);
								})}
						</div>

						<div className="flex items-center gap-2">
							<Button
								onClick={() => goToPage(currentPage - 1)}
								disabled={isFirstPage || isLoading}
								size="icon"
								aria-label="Предыдущая страница"
							>
								<ArrowLeft className="text-foreground_1" />
							</Button>

							<Button
								onClick={actions.onGoNextPage}
								disabled={!hasNextPage || isLoading}
								size="icon"
								aria-label="Следующая страница"
							>
								<ArrowRight className="text-foreground_1" />
							</Button>
						</div>
					</div>
				</td>
			</tr>
		</tfoot>
	);
};

export default TableFooter;
