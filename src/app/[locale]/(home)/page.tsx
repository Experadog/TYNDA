import { getEstablishmentAllClient } from '@/services/establishment/establishmentService';
import HomeView from './home-view';

const Home = async () => {
	const establishmentAllClient = await getEstablishmentAllClient({});
	return <HomeView establishments={establishmentAllClient?.data?.items || []} />;
};

export default Home;
