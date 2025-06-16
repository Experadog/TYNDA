import type { FC } from 'react';
import { AiFillInfoCircle } from 'react-icons/ai';

interface IProps {
	text?: string;
}

const Empty: FC<IProps> = ({ text }) => {
	return (
		<div className="flex flex-col gap-3 h-full w-full justify-center items-center bg-background_1 rounded-2xl p-4">
			<AiFillInfoCircle className="size-14 text-foreground_1" />

			<div className="flex flex-col gap-2 items-center">
				<span className="text-foreground_1 font-semibold text-base">Пока что пусто...</span>
				{text && <span className="text-foreground_2 font-semibold text-sm">{text}</span>}
			</div>
		</div>
	);
};

export default Empty;
