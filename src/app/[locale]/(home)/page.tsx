import { getEstablishmentAllclient } from '@/services/establishment/establishmentService';
import { FC } from 'react';
import HomeView from './home-view';

interface IProps {}

const Home: FC<IProps> = async ({}) => {
    const establishmentAllclient = await getEstablishmentAllclient({})
    return <HomeView establishments={establishmentAllclient?.data?.items || []} />;
};

export default Home;
