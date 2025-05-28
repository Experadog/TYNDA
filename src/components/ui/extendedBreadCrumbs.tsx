import { Link } from '@/i18n/routing';
import type { Crumb } from '@common';
import type { FC } from 'react';
import { SlArrowRight } from 'react-icons/sl';

interface IProps {
	home: Crumb;
	paths: Crumb[];
	hideSingle?: boolean;
}

export const ExtendedBreadCrumbs: FC<IProps> = ({ home, paths, hideSingle = false }) => {
	return (
		<div className="flex items-center flex-wrap gap-2 text-sm">
			<Link href={home.href}>
				<span className="opacity-50 hover:text-yellow hover:opacity-100">{home.label}</span>
			</Link>

			{paths.map((crumb, index) => {
				const isLast = index === paths.length - 1;

				return (
					<div key={crumb.href} className="flex items-center gap-2">
						<SlArrowRight className="text-[14px] opacity-50" />

						{isLast || !crumb.href ? (
							<span className="opacity-50">{crumb.label}</span>
						) : (
							<Link href={crumb.href}>
								<span className="opacity-50 hover:text-yellow hover:opacity-100">
									{crumb.label}
								</span>
							</Link>
						)}
					</div>
				);
			})}
		</div>
	);
};
