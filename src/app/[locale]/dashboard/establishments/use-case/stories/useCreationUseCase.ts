'use client';

import { useRouter } from '@/i18n/routing';
import { PAGES, URL_ENTITIES } from '@/lib';
import { useUser } from '@/providers/user/user-provider';
import {
	type EstablishmentAdminCreationRequestModel,
	type EstablishmentCreationRequestModel,
	type EstablishmentCreationResponseModel,
	createEstablishment,
} from '@/services';
import {
	type EstablishmentFormValues,
	type Params,
	createAction,
	loadFilesAction,
	revalidateByTags,
	useAsyncAction,
} from '@common';

type Props = {
	viewModel: {
		loadFile: ViewModel['Toast']['LoadFile'];
		creation: ViewModel['Toast']['EstablishmentCreation'];
	};
};

export function useCreationUseCase({ viewModel }: Props) {
	const router = useRouter();

	const { user } = useUser();
	const isSuperUser = user?.is_superuser || false;

	const { execute: establishmentCreationExecute } = useAsyncAction<
		EstablishmentCreationResponseModel,
		[EstablishmentCreationRequestModel | EstablishmentAdminCreationRequestModel, Params?]
	>({
		messages: viewModel.creation,
	});

	const establishmentCreationAction = createAction({
		requestAction: createEstablishment,
		onSuccess: async () => {
			await revalidateByTags([
				URL_ENTITIES.ESTABLISHMENT_ALL_ESTABLISHER,
				URL_ENTITIES.ESTABLISHMENT_ALL_CLIENT,
				URL_ENTITIES.USERS,
			]);
			router.push(PAGES.ESTABLISHMENT);
		},
	});

	const buildRequestData = (
		commonData: EstablishmentCreationRequestModel,
		establisher?: EstablishmentFormValues['establisher'],
	): EstablishmentCreationRequestModel | EstablishmentAdminCreationRequestModel => {
		if (!isSuperUser) return commonData;

		return {
			obj: commonData,
			establisher: establisher?.email ? establisher : undefined,
		};
	};

	const onSubmit = async (data: EstablishmentFormValues) => {
		const {
			cover,
			images,
			work_time_start,
			work_time_end,
			establisher,
			establisher_id,
			...rest
		} = data;
		if (!cover) return;

		const allFiles = [cover, ...images];

		const res = await loadFilesAction({
			data: allFiles,
			messages: viewModel.loadFile,
		});

		if (!res.length) return;

		const [uploadedCover, ...uploadedImages] = res;
		const work_time = `${work_time_start}-${work_time_end}`;

		const commonRequestData: EstablishmentCreationRequestModel = {
			...rest,
			cover: uploadedCover,
			images: uploadedImages,
			work_time,
		};

		const requestData = buildRequestData(commonRequestData, establisher);

		await establishmentCreationExecute(
			establishmentCreationAction,
			requestData,
			establisher_id
				? {
						establisher_id: establisher_id,
					}
				: undefined,
		);
	};

	return { onSubmit };
}
