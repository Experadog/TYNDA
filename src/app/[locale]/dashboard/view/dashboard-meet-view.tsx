'use client';

import { useUser } from '@/providers/user/user-provider';
import { UserRole } from '@business-entities';

const DashboardMeetView = () => {
	const { user } = useUser();

	const isEstablisher = user?.role === UserRole.ESTABLISHER;
	const isSuperAdmin = user?.is_superuser;
	const isStaff = user?.role === UserRole.ESTABLISHER_WORKER;

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

			{isSuperAdmin && (
				<div>
					<h3 className="text-xl font-semibold mb-2 text-foreground_1">
						Возможности администратора:
					</h3>
					<ul className="list-disc list-inside text-gray space-y-1">
						<li>Полный доступ ко всем предприятиям и данным системы.</li>
						<li>Real-time чат с предприятиями</li>
						<li>Создание и управление компаниями и пользователями.</li>
						<li>Гибкая настройка прав доступа и ролей.</li>
						<li>Управление глобальными настройками платформы.</li>
					</ul>
				</div>
			)}

			{isEstablisher && (
				<div>
					<h3 className="text-xl font-semibold mb-2 text-foreground_1">
						Возможности владельца предприятия:
					</h3>
					<ul className="list-disc list-inside text-gray space-y-1">
						<li>Управление своими предприятиями и сотрудниками.</li>
						<li>Real-time чат с клиентами</li>
						<li>Создание и управление скидками, акциями и предложениями.</li>
						<li>Настройка параметров предприятия и профиля.</li>
					</ul>
				</div>
			)}

			{isStaff && (
				<div>
					<h3 className="text-xl font-semibold mb-2 text-foreground_1">
						Возможности сотрудника:
					</h3>
					<ul className="list-disc list-inside text-gray space-y-1">
						<li>Просмотр и выполнение задач, доступных по своим правам.</li>
						<li>Взаимодействие с предприятием</li>
						<li>Доступ к внутренним процессам компании в рамках своей роли.</li>
					</ul>
				</div>
			)}

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
