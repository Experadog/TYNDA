import type { Card } from '@business-entities';
import type { CardSchema } from '@common';
import { useState } from 'react';

type Props = {
	schema: CardSchema;
};

export function useCardModalUseCase({ schema }: Props) {
	const [card, setCard] = useState<Card | null>(null);
	const [isUpdatingModal, setIsUpdatingModal] = useState(false);

	const onOpenUpdating = (card: Card) => {
		setIsUpdatingModal(true);
		setCard(card);
		schema.reset({
			expire_date: card.expire_date,
			status: card.status,
			tariff_id: card.tariff.id,
			type: card.tariff.card_type,
		});
	};

	const onCloseUpdating = () => {
		setIsUpdatingModal(false);
		setCard(null);
	};

	return { onOpenUpdating, onCloseUpdating, isUpdatingModal, card };
}
