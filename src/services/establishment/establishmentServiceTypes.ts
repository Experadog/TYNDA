import type {
	EstablishmentDetailed,
	EstablishmentListItem,
	EstablishmentMap,
} from '@/business-entities/establishment/EstablishmentEntity';
import type { CommonResponse, EstablishmentFormValues, Paginated } from '@common';

export type EstablishmentClientRetrievalResponseModel = CommonResponse<
	Paginated<EstablishmentListItem>
>;
export type EstablishmentRetrievalDetailedResponseModel = CommonResponse<{
	establishment: EstablishmentDetailed;
}>;

export type EstablishmentCreationRequestModel = Omit<
	Omit<
		EstablishmentFormValues,
		'cover' | 'images' | 'work_time_start' | 'work_time_end' | 'establisher' | 'establisher_id'
	>,
	never
> & {
	cover: string;
	images: string[];
	work_time: string;
};

export type EstablishmentCreationResponseModel = CommonResponse<string>;

export type EstablishmentAdminCreationRequestModel = {
	obj: EstablishmentCreationRequestModel;
	establisher?: EstablishmentFormValues['establisher'];
};

export type EstablishmentDeletionRequestModel = { id: string };
export type EstablishmentDeletionResponseModel = CommonResponse<string>;

export type EstablishmentUpdatingRequestModel = {
	payload: Partial<EstablishmentCreationRequestModel>;
	id: string;
};
export type EstablishmentUpdatingResponseModel = CommonResponse<string>;

export type EstablishmentMapRetrieval = CommonResponse<EstablishmentMap[]>;
