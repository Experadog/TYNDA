import type { ChatListItem, ChatType } from '@business-entities';
import type { CommonResponse, Paginated } from '@common';

export type ChatListRetrievalResponseModel = CommonResponse<Paginated<ChatListItem>>;
export type ChatRetrievalResponseModel = CommonResponse<ChatType>;
