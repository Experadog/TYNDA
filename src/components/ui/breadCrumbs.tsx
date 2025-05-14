import { Link } from '@/i18n/routing';
import type { FC } from 'react';
import { SlArrowRight } from 'react-icons/sl';

interface IProps {
	home: string;
	pageName: string;
}

export const BreadCrumbs: FC<IProps> = ({ home, pageName }) => {
	return (
		<div className="lg:hidden">
			<div className="flex items-center gap-2 lg:hidden">
				<Link href="/">
					<span className="opacity-50 hover:text-yellow hover:opacity-100">{home}</span>
				</Link>
				<SlArrowRight className="text-[14px] opacity-50" />
				<span className="opacity-50">{pageName}</span>
			</div>
		</div>
	);
};
