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
	revalidateByTags,
	useAsyncAction,
} from '@common';

type Props = {
	viewModel: {
		loadFile: ViewModel['Toast']['LoadFile'];
		loadFileValidation: ViewModel['CommonToast']['too_large_image'];
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
				URL_ENTITIES.ESTABLISHMENT_ALL_CLIENT,
				URL_ENTITIES.ESTABLISHMENT_DETAIL,
				URL_ENTITIES.ESTABLISHMENT_ALL_ESTABLISHER,
				URL_ENTITIES.ESTABLISHMENT_ALL_ADMIN,
			]);

			await refetchPagination();

			setTimeout(() => {
				router.push(PAGES.ESTABLISHMENT);
			}, 300);
		},
	});

	const onSubmit = async (data: EstablishmentFormValues, id: string) => {
		const { cover, images, work_time_start, work_time_end, ...rest } = data;
		if (!cover) return;

		const allFiles = [cover, ...images];

		const urls = await loadFilesAction({
			data: allFiles,
			toastMessage: viewModel.loadFile,
			validationMessage: viewModel.loadFileValidation,
		});

		const [uploadedCover, ...uploadedImages] = urls;
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
