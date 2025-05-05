import type { FC, ReactNode } from 'react';
import Sidebar from '../_components/sidebar';

interface IProps {
	children: ReactNode;
}

const UpdateProfileView: FC<IProps> = ({ children }) => {
	return (
		<div className="flex gap-14 py-7">
			<div className="flex-[1/3]">
				<Sidebar />
			</div>
			<div className="flex-1">{children}</div>
		</div>
	);
};

export default UpdateProfileView;
