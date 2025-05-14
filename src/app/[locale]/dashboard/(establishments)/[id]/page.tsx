import { getEstablishmentDetail } from '@/services';
import EstablishmentForm from '../_components/form/establishment-form';

type Params = Promise<{
	id: string;
}>;

const Page = async ({ params }: { params: Params }) => {
	const { id } = await params;

	const response = await getEstablishmentDetail(id);

	return <EstablishmentForm establishment={response.data.establishment} />;
};

export default Page;
