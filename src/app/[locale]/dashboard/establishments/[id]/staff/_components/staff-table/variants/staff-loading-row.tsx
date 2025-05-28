import { LoadingSpinner } from '@components';

const StaffLoadingRow = () => {
	return (
		<tbody className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
			<tr>
				<td colSpan={6}>
					<div>
						<LoadingSpinner className="text-orange size-10" />
					</div>
				</td>
			</tr>
		</tbody>
	);
};

export default StaffLoadingRow;
