import { LuUserRoundPlus } from 'react-icons/lu';

const UsersEmptyRow = () => {
	return (
		<tbody className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
			<tr>
				<td colSpan={6}>
					<div className="flex flex-col items-center gap-3">
						<LuUserRoundPlus className="text-foreground_2 size-10" />
						<p className="text-gray">На данный момент нет пользователей</p>
						<p className="text-shade_gray">Добавьте первого пользователя!</p>
					</div>
				</td>
			</tr>
		</tbody>
	);
};

export default UsersEmptyRow;
