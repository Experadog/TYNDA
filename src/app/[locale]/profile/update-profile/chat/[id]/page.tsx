import { getDetailedChat } from '@/services';
import { Chat } from '@components';

type Params = Promise<{
	id: string;
}>;

const Page = async ({ params }: { params: Params }) => {
	const { id } = await params;
	const response = await getDetailedChat({ chat_id: id }, 'profile');
	return <Chat chat={response.data} scope="profile" />;
};

export default Page;
