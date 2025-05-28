import { useViewModel } from '@/i18n/getTranslate';
import type { EntityStatus } from '@common';
import clsx from 'clsx';

type Props = {
	status: EntityStatus;
	className?: string;
};

const EntityStatusComponent = ({ status, className }: Props) => {
	const { EntityStatus } = useViewModel(['Shared']);

	const text: Record<EntityStatus, string> = {
		disable: 'text-error',
		enable: 'text-success',
	};

	return (
		<p className={clsx(text[status], className, 'font-semibold text-sm')}>
			{EntityStatus[status]}
		</p>
	);
};

export default EntityStatusComponent;
