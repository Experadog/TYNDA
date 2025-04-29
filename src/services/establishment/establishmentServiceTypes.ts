import type {
	EstablishmentDetailed,
	EstablishmentListItem,
} from '@/business-entities/establishment/EstablishmentEntity';
import type { CommonResponse, Paginated } from '@common';

export type GetEstablishmentAllClientResponseModel = CommonResponse<
	Paginated<EstablishmentListItem>
>;
export type GetEstablishmentDetailedResponseModel = CommonResponse<{
	establishment: EstablishmentDetailed;
}>;
