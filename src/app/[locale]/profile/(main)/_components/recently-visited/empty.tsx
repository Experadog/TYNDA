import type { FC } from 'react';
import { AiFillInfoCircle } from 'react-icons/ai';

const Empty: FC = () => {
	return (
		<div className="flex flex-col gap-3 h-full w-full justify-center items-center">
			<AiFillInfoCircle className="size-14 text-foreground_1" />
			<div className="flex flex-col gap-2 items-center">
				<span className="text-foreground_1 font-semibold text-base">Пока что пусто...</span>
				<span className="text-foreground_2 font-semibold text-sm">
					Посетите ваше первое место!
				</span>
			</div>
		</div>
	);
};

export default Empty;
