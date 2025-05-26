import { ImFileEmpty } from 'react-icons/im';

const EmptyView = () => {
	return (
		<div className="flex flex-col justify-center items-center h-full ">
			<ImFileEmpty className="text-foreground_1 text-4xl mb-4" />
			<h2 className="text-xl font-semibold text-foreground_1 mb-2">
				Разрешения к этой области недоступны
			</h2>
			<p className="text-md font-normal text-gray ">Добавьте новое разрешение</p>
		</div>
	);
};

export default EmptyView;
