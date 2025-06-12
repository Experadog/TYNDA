import { DTOEmptyTariffFields } from '@/dto/dtoEmpty';
import { supportedLanguages } from '@/i18n/routing';
import type { Tariff } from '@business-entities';
import type { TariffFormValues, TariffSchema } from '@common';
import { useState } from 'react';

export function useTariffActionModalUseCase({ schema }: { schema: TariffSchema }) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedTariff, setSelectedTariff] = useState<Tariff | null>(null);

	const [isDeletionModal, setIsDeletionModal] = useState(false);

	const transformDescription = (lines: string[]): string[] => {
		if (!lines.length) return [];

		return lines.map((line) => `–${line}`);
	};

	const prepareTranslates = (item: Tariff) => {
		const translates = item.translates || {};

		const result = Object.entries(translates).reduce(
			(acc, [lang, value]) => {
				const key = lang as keyof typeof item.translates;
				acc[key] = {
					...value,
					description: transformDescription(value.description),
				};
				return acc;
			},
			{} as TariffFormValues['translates'],
		);

		for (const lang of supportedLanguages) {
			if (!(lang in result)) {
				result[lang] = {
					name: '',
					description: [''],
				};
			}
		}

		return result;
	};

	const onOpen = (item?: Tariff) => {
		setSelectedTariff(item || null);
		setIsOpen(true);

		if (item) {
			const transformedDescription = prepareTranslates(item);

			const transformedTariff: TariffFormValues = {
				...item,
				translates: transformedDescription,
			};

			schema.reset(transformedTariff);
		} else {
			schema.reset(DTOEmptyTariffFields);
		}
	};

	const clearSelectedTariff = () => {
		setTimeout(() => {
			setSelectedTariff(null);
		}, 300);
	};

	const onClose = () => {
		setIsOpen(false);
		clearSelectedTariff();
	};

	const onOpenDeletionModal = (tariff: Tariff) => {
		setIsDeletionModal(true);
		setSelectedTariff(tariff);
	};

	const onCloseDeletionModal = () => {
		setIsDeletionModal(false);
		clearSelectedTariff();
	};

	return {
		isOpen,
		onClose,
		selectedTariff,
		onOpen,
		onOpenDeletionModal,
		isDeletionModal,
		onCloseDeletionModal,
	};
}
