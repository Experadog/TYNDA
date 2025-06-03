import { getDetailedChat } from '@/services';
import { Chat } from '@components';

type Params = Promise<{
	chat_id: string;
}>;

const Page = async ({ params }: { params: Params }) => {
	const { chat_id } = await params;
	const response = await getDetailedChat({ chat_id }, 'establishment');
	return <Chat chat={response.data} scope="establishment" />;
};

export default Page;
