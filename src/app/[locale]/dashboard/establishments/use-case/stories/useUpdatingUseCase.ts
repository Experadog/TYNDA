'use client';

import { useRouter } from '@/i18n/routing';
import { PAGES, URL_ENTITIES } from '@/lib';
import {
	type EstablishmentCreationRequestModel,
	type EstablishmentUpdatingRequestModel,
	type EstablishmentUpdatingResponseModel,
	updateEstablishment,
} from '@/services';
import {
	type EstablishmentFormValues,
	createAction,
	loadFilesAction,
	pushCommonToast,
	revalidateByTags,
	useAsyncAction,
} from '@common';

type Props = {
	viewModel: {
		loadFile: ViewModel['Toast']['LoadFile'];
		updating: ViewModel['Toast']['EstablishmentUpdating'];
	};

	refetchPagination: () => Promise<void>;
};

export function useUpdatingUseCase({ viewModel, refetchPagination }: Props) {
	const router = useRouter();

	const { execute: establishmentUpdatingExecute } = useAsyncAction<
		EstablishmentUpdatingResponseModel,
		[EstablishmentUpdatingRequestModel]
	>({
		messages: viewModel.updating,
	});

	const establishmentUpdatingAction = createAction({
		requestAction: updateEstablishment,
		onSuccess: async () => {
			await revalidateByTags([
				URL_ENTITIES.ESTABLISHMENT_ALL_ESTABLISHER,
				URL_ENTITIES.ESTABLISHMENT_ALL_CLIENT,
				URL_ENTITIES.ESTABLISHMENT_DETAIL,
			]);

			router.push(PAGES.ESTABLISHMENT);
			await refetchPagination();
		},
	});

	const onSubmit = async (data: EstablishmentFormValues, id: string) => {
		const { cover, images, work_time_start, work_time_end, ...rest } = data;
		if (!cover) return;

		const allFiles = [cover, ...images];

		const res = await loadFilesAction({
			data: allFiles,
			messages: viewModel.loadFile,
		});

		if (!res.length) {
			pushCommonToast('Суммарный размер файлов не должен превышать 10 МБ.', 'error');
			return;
		}

		const [uploadedCover, ...uploadedImages] = res;
		const work_time = `${work_time_start}-${work_time_end}`;

		const requestData: EstablishmentCreationRequestModel = {
			...rest,
			cover: uploadedCover,
			images: uploadedImages,
			work_time,
		};

		await establishmentUpdatingExecute(establishmentUpdatingAction, {
			id,
			payload: requestData,
		});
	};

	return { onSubmit };
}
