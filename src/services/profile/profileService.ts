import { URL_ENTITIES } from '@/lib';
import { AXIOS_GET } from '@common';
import { ProfileResponseModel } from './profileServiceTypes';

class ProfileService {
    static async getProfileInfo() {
        const response = await AXIOS_GET<ProfileResponseModel>({ url: URL_ENTITIES.PROFILE });
        return response;
    }
}

export const getProfileInfo = ProfileService.getProfileInfo;
