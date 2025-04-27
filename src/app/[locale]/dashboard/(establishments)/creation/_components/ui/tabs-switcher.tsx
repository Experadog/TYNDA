'use client';

import { Button } from '@components';
import clsx from 'clsx';
import { useTabSwitcherUseCase } from '../../use-cases/useTabSwitcherUseCase';

const TabsSwitcher = () => {
	const {
		actions: { onSwitchTab },
		states: { activeTab, tabs },
	} = useTabSwitcherUseCase();

	return (
		<div className="flex items-center gap-5 w-full">
			{tabs.map((tab) => (
				<Button
					key={tab.id}
					onClick={() => onSwitchTab(tab)}
					className={clsx(
						'p-3 rounded-lg text-foreground_1 shadow-none',
						activeTab.id === tab.id && 'bg-yellow text-white',
					)}
				>
					{tab.title}
				</Button>
			))}
		</div>
	);
};

export default TabsSwitcher;
