'use client';

import DialogWrapper from '@/components/dialog-wrapper/dialog-wrapper';
import InfinityScroll from '@/components/infinity-scroll/infinity-scroll';
import { Button } from '@/components/ui/button';
import CustomInput from '@/components/ui/customInput';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import type { GetEstablishmentAllClientResponseModel } from '@/services';
import type { ChatScope } from '@business-entities';
import { Plus } from 'lucide-react';
import EstablishmentChatItem from '../list/establishment-chat-item';
import { useChatCreationUseCase } from './useChatCreationUseCase';

type Props = {
	establishments?: GetEstablishmentAllClientResponseModel['data'];
	scope: ChatScope;
};

const ChatCreationModal = ({ establishments, scope }: Props) => {
	const { actions, states } = useChatCreationUseCase({ establishments, scope });
	const { isOpen, pagination, search } = states;
	const { onClose, onCreateChat, onOpen } = actions;

	return (
		<>
			<Button variant={'yellow'} disableAnimation onClick={onOpen}>
				<Plus className="text-white" />
			</Button>

			<DialogWrapper action="default" isOpen={isOpen} onClose={onClose} title="Создайте чат">
				<div className="flex flex-col w-full gap-4">
					<div className="flex flex-col gap-1">
						<p className="text-gray text-sm">Поиск заведения</p>
						<CustomInput
							placeholder="Поиск..."
							value={search.searchValue}
							onChange={(e) => search.onChange(e.target.value)}
						/>
					</div>

					<InfinityScroll
						isLoading={pagination.states.isLoading}
						hasMore={pagination.states.hasNextPage}
						onLoadMore={pagination.actions.onGoNextPage}
						className="max-h-[350px] min-h-[350px] h-[350px] flex flex-col gap-1 pb-3"
					>
						{search.isLoading ? (
							<LoadingSpinner className="text-yellow size-10 m-auto" />
						) : (
							pagination.states.list.map((item) => (
								<EstablishmentChatItem
									item={item}
									key={item.id}
									onClick={onCreateChat}
								/>
							))
						)}

						{search.searchValue &&
							!pagination.states.list.length &&
							!search.isLoading && (
								<div className="flex flex-col m-auto items-center">
									<p className="text-gray mx-auto my-auto">
										По ключевому слову: "{search.searchValue}"
									</p>
									<p className="text-gray">Ничего не найдено</p>
								</div>
							)}
					</InfinityScroll>
				</div>
			</DialogWrapper>
		</>
	);
};

export default ChatCreationModal;
