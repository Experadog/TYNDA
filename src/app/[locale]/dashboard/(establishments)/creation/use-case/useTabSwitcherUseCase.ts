import { useState } from 'react';

type Tab = { title: string; id: number };

export function useTabSwitcherUseCase(): Exposes {
	const tabs: Tab[] = [
		{
			title: 'Общая информация',
			id: 1,
		},

		{
			title: 'Сотрудники',
			id: 2,
		},
		{
			title: 'Отзывы и рейтинги',
			id: 3,
		},
		{
			title: 'Скидки и акции',
			id: 4,
		},
	];

	const [activeTab, setActiveTab] = useState(tabs[0]);

	const onSwitchTab = (tab: Tab) => {
		setActiveTab(tab);
	};

	return {
		actions: {
			onSwitchTab,
		},

		states: { activeTab, tabs },
	};
}

type Exposes = {
	actions: {
		onSwitchTab: (tab: Tab) => void;
	};
	states: {
		activeTab: Tab;
		tabs: Tab[];
	};
};
