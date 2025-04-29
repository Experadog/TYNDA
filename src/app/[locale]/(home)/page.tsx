import { getEstablishmentAllClient } from '@/services/establishment/establishmentService';
import type { FC } from 'react';
import HomeView from './home-view';

type IProps = {};

const Home: FC<IProps> = async ({}) => {
	const establishmentAllClient = await getEstablishmentAllClient({});
	return <HomeView establishments={establishmentAllClient?.data?.items || []} />;
};

export default Home;
