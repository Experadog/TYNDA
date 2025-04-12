'use server';

import { createFetchAction } from '@/common/actions/createFetchAction';
import { COOKIES, encryptData, isSuccessResponse, parseISOStringToDate, URL_ENTITIES } from '@/lib';
import { Session, User } from '@business-entities';
import {
    AXIOS_GET,
    AXIOS_PATCH,
    AXIOS_POST,
    CommonDataStringResponse,
    getCookie,
    Params,
    setCookie,
} from '@common';
import {
    ClientHistoryResponseModel,
    ProfileResponseModel,
    ProfileUpdateResponseModel,
} from './profileServiceTypes';

class ProfileService {
    static async getProfileInfo() {
        const response = await AXIOS_GET<ProfileResponseModel>({
            url: URL_ENTITIES.PROFILE,
        });

        return response;
    }

    static async getClientHistory(params: Params) {
        const response = await createFetchAction<ClientHistoryResponseModel>({
            endpoint: URL_ENTITIES.CARD_HISTORY,
            shouldBeAuthorized: true,
            revalidateTags: [URL_ENTITIES.CARD_HISTORY],
            params: { ...params, size: '20' },
        });

        return response;
    }

    static async updateProfile(payload: Partial<User>) {
        const response = await AXIOS_PATCH<ProfileUpdateResponseModel>({
            url: URL_ENTITIES.PROFILE,
            data: payload,
        });

        if (isSuccessResponse(response)) {
            const session = await getCookie<Session>(COOKIES.SESSION, true);

            if (!session) {
                return {
                    code: 400,
                    msg: '',
                    data: '',
                };
            }

            const newSession: Session = {
                ...session,
                user: { ...session?.user, ...payload },
            };

            setCookie(
                COOKIES.SESSION,
                encryptData(newSession),
                parseISOStringToDate(session.refresh_token_expire_time),
            );
        }

        return response;
    }

    static async firstStepPhoneVerification() {
        const response = await AXIOS_POST<CommonDataStringResponse>({
            url: URL_ENTITIES.PHONE_PRE_VERIFY,
        });

        return response;
    }
}

export const { firstStepPhoneVerification, getClientHistory, getProfileInfo, updateProfile } =
    ProfileService;
