import { FaInbox } from 'react-icons/fa';

const EmptyRow = () => {
	return (
		<tbody className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
			<tr>
				<td colSpan={6}>
					<div className="flex flex-col items-center justify-center text-center gap-2 py-6">
						<FaInbox className="text-gray w-10 h-10" />
						<p className="text-sm text-gray">Данных пока нет</p>
						<p className="text-xs text-gray">
							Нажмите кнопку <strong>«Добавить»</strong>, чтобы создать первую запись
						</p>
					</div>
				</td>
			</tr>
		</tbody>
	);
};

export default EmptyRow;
