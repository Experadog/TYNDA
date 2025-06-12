import { getTariffList, getUserCard } from '@/services';
import TariffsView from './view/tariffs-view';

const Page = async () => {
	const listResponse = await getTariffList();
	const userCardResponse = await getUserCard();

	return <TariffsView other_tariffs={listResponse.data} userCard={userCardResponse.data} />;
};

export default Page;
