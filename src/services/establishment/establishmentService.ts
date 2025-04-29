'use server';

import { URL_ENTITIES } from '@/lib';
import { AXIOS_GET, Params } from '@common';
import { GetEstablishmentAllClientResponseModel, GetEstablishmentDetailResponseModel } from './establishmentServiceTypes.ts';

class EstablishmentService {
    static async getEstablishmentAllclient(params: Params): Promise<GetEstablishmentAllClientResponseModel> {
        const response = await AXIOS_GET<GetEstablishmentAllClientResponseModel>({
            url: URL_ENTITIES.ESTABLISHMENTALLCLIENT,
            params: params
        });
        return response;
    }
    static async getEstablishmentDetail(id: string): Promise<GetEstablishmentDetailResponseModel> {
        const response = await AXIOS_GET<GetEstablishmentDetailResponseModel>({
            url: `${URL_ENTITIES.ESTABLISHMENTDETAIL}/${id}`,
        });
        return response;
    }
}

export const { getEstablishmentAllclient, getEstablishmentDetail } = EstablishmentService;
