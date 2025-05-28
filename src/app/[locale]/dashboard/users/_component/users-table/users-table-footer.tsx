import { cn } from '@/lib/utils'; // если используешь класснейм утилиту
import { Button } from '@components';
import clsx from 'clsx';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useUsersContext } from '../../context/users-context-provider';

const UsersTableFooter = () => {
	const {
		pagination: {
			actions: { onGoNextPage, setPage },
			states: { allPages, currentPage, isFirstPage, hasNextPage, isLoading, data },
		},
	} = useUsersContext();

	const totalLoadedPages = Object.keys(allPages)
		.map(Number)
		.sort((a, b) => a - b);

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setPage(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		onGoNextPage();
	};

	return (
		<tfoot>
			<tr>
				<td
					colSpan={6}
					className="px-4 py-3 border-t border-light_gray rounded-b-lg font-roboto"
				>
					<div className="flex items-center justify-between w-full">
						<div className="flex items-center gap-2">
							{data.length && totalLoadedPages.length
								? totalLoadedPages.map((page) => (
										<Button
											key={page}
											onClick={() => setPage(page)}
											size={'icon'}
											className={cn(
												page === currentPage
													? 'bg-orange text-white'
													: 'border-light_gray text-foreground_1 hover:bg-gray-100',
											)}
										>
											{page}
										</Button>
									))
								: null}
						</div>

						<div className="flex items-center gap-2">
							<Button
								onClick={handlePrevPage}
								disabled={isLoading}
								size={'icon'}
								className={clsx(!isFirstPage ? 'flex' : 'hidden')}
							>
								<ArrowLeft className="text-foreground_1" />
							</Button>

							{hasNextPage && (
								<Button onClick={handleNextPage} size={'icon'} disabled={isLoading}>
									<ArrowRight className="text-foreground_1" />
								</Button>
							)}
						</div>
					</div>
				</td>
			</tr>
		</tfoot>
	);
};

export default UsersTableFooter;
