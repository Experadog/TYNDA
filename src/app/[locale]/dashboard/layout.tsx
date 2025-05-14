import { getEstablishmentAllEstablisher } from '@/services';
import { getProfileInfo } from '@/services/profile/profileService';
import type { FC, ReactNode } from 'react';
import { UpdateProfileProvider } from '../profile/update-profile/use-case/useUpdateProfileUseCase';
import { EstablishmentContextProvider } from './(establishments)/use-case/establishment-context-provider';
import Sidebar from './_components/sidebar';

interface IProps {
	children: ReactNode;
}

const DashboardLayout: FC<IProps> = async ({ children }) => {
	const establishmentsResponse = await getEstablishmentAllEstablisher({ page: '1', size: '10' });
	const userResponse = await getProfileInfo();

	return (
		<EstablishmentContextProvider establishments={establishmentsResponse.data}>
			<UpdateProfileProvider user={userResponse.data}>
				<div className="flex full-height">
					<div className="flex-[1] bg-background_6 p-6 border-r border-r-light_gray">
						<Sidebar />
					</div>
					<div className="flex-[5] p-6  bg-background_2 full-height-max min-w-0 pb-10">
						{children}
					</div>
				</div>
			</UpdateProfileProvider>
		</EstablishmentContextProvider>
	);
};

export default DashboardLayout;
