import { useViewModel } from '@/i18n/getTranslate';
import { URL_ENTITIES } from '@/lib';
import {
	type CardUpdatingRequestModel,
	type CardUpdatingResponseModel,
	updateCard,
} from '@/services';
import { type CardFormValues, createAction, revalidateByTags, useAsyncAction } from '@common';

type Props = {
	onCloseUpdatingModel: () => void;
	cardID?: string;
};

export function useCardUpdatingUseCase({ onCloseUpdatingModel, cardID }: Props) {
	const { CardUpdating } = useViewModel(['Toast']);

	const { execute } = useAsyncAction<CardUpdatingResponseModel, [CardUpdatingRequestModel]>({
		messages: CardUpdating,
	});

	const onSuccess = async () => {
		await revalidateByTags([URL_ENTITIES.CARD_ALL]);
		onCloseUpdatingModel();
	};

	const action = createAction({
		requestAction: updateCard,
		onSuccess,
	});

	const onUpdate = async (values: CardFormValues) => {
		if (!cardID) return;

		const req: CardUpdatingRequestModel = {
			cardID,
			payload: values,
		};

		await execute(action, req);
	};

	return { onUpdate };
}
