'use client';

import { useUser } from '@/providers/user/user-provider';

const DashboardMeetView = () => {
	const { user } = useUser();

	return (
		<div className="w-full h-full flex flex-col gap-6">
			<div>
				<h2 className="text-3xl font-bold mb-2 text-foreground_1">
					{user?.first_name}, Здравствуйте!
				</h2>
				<p className="text-gray text-base">
					Добро пожаловать в панель управления. <br /> Здесь вы можете гибко управлять
					своим бизнесом, сотрудниками, разрешениями и настройками.
				</p>
			</div>

			<div>
				<h3 className="text-xl font-semibold mb-2">Основные разделы:</h3>
				<ul className="list-disc list-inside text-gray-700 space-y-1 text-gray">
					<li>
						<strong className="italic text-foreground_1">Предприятия</strong> — список
						всех доступных компаний, возможность добавления и редактирования.
					</li>
					<li>
						<strong className="italic text-foreground_1">Сотрудники</strong> —
						добавление, редактирование и управление правами доступа персонала.
					</li>
					<li>
						<strong className="italic text-foreground_1">Роли</strong> — настройка
						уровней доступа и ролей для безопасности и гибкости.
					</li>
					<li>
						<strong className="italic text-foreground_1">Взаимодействие</strong> —
						коммуникация и взаимодействие внутри платформы.
					</li>
					<li>
						<strong className="italic text-foreground_1">Скидки и акции</strong> —
						управление маркетинговыми кампаниями, акциями и предложениями.
					</li>
					<li>
						<strong className="italic text-foreground_1">Настройки</strong> —
						персонализация профиля, языка, уведомлений и других параметров.
					</li>
				</ul>
			</div>

			<div>
				<h3 className="text-xl font-semibold mb-2 text-foreground_1">
					Возможности панели:
				</h3>
				<ul className="list-disc list-inside text-gray-700 space-y-1">
					<li>Создавайте, редактируйте и удаляйте данные (CRUD) в каждом разделе.</li>
					<li>Настраивайте доступ для каждого сотрудника по ролям.</li>
					<li>Взаимодействуйте с клиентами в реальном времени.</li>
					<li>Гибкая и интуитивная навигация по интерфейсу.</li>
				</ul>
			</div>
		</div>
	);
};

export default DashboardMeetView;
