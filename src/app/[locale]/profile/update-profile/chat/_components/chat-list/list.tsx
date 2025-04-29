import ListItem from './list-item';

const List = () => {
	const data = [
		{
			avatar: '',
			name: 'Supara Etno Complex',
			time: '1 мин',
			id: 1,
			last_message:
				'Здравствуйте! Спасибо за ваш интерес. Да, напишите ваши контактные данные и Ф.И.О для дальнейшей брони столика ',
		},
	];

	return (
		<div className="h-full flex flex-col gap-5">
			{data.map((item) => (
				<ListItem key={item.id} {...item} />
			))}
		</div>
	);
};

export default List;
