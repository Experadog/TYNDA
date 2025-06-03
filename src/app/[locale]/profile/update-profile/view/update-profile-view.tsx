import type { FC, ReactNode } from 'react';
import Sidebar from '../_components/sidebar';

interface IProps {
	children: ReactNode;
}

const UpdateProfileView: FC<IProps> = ({ children }) => {
	return (
		<div className="flex full-height bg-background_2">
			<div className="flex-[1/3]">
				<Sidebar />
			</div>
			<div className="flex-1 p-3 full-height-max">{children}</div>
		</div>
	);
};

export default UpdateProfileView;
