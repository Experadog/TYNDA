import { Link } from '@/i18n/routing';
import { phoneFormatter } from '@/lib';

type Props = {
	list: string[] | string;
	className: string;
};

const PhoneLink = ({ list, className }: Props) => {
	if (Array.isArray(list)) {
		return list?.map((item, idx) => (
			<Link
				className={className}
				href={`tel:${item}`}
				key={`${item}-${
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					idx
				}`}
			>
				{phoneFormatter(item)}
				{idx + 1 !== list.length ? '; ' : ''}
			</Link>
		));
	}

	if (typeof list === 'string') {
		list.split('; ').map((item, idx) => (
			<Link
				className={className}
				href={`tel:${item}`}
				key={`${item}-${
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					idx
				}`}
			>
				{phoneFormatter(item)}
				{idx + 1 !== list.length ? '; ' : ''}
			</Link>
		));
	}
};

export default PhoneLink;
