'use client';

import { DTOEmptyTariffFields } from '@/dto/dtoEmpty';
import { CardVariants } from '@business-entities';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createTranslatesShape } from '../common/common-rules';

export const tariffFormShape = (messages: ViewModel['Validation']) => {
	const baseTranslateShape = {
		name: z.string({ message: messages.required }).max(100, messages.max_100),
		description: z
			.union([z.string(), z.array(z.string())])
			.transform((val): string[] => {
				let lines: string[] = [];

				if (typeof val === 'string') {
					lines = val
						.split('\n')
						.map((line) =>
							line
								.replace(/^[-–•;•\s]*/, '')
								.replace(/[;,-]/g, '')
								.trim(),
						)
						.filter((line) => line.length > 0);
				} else {
					lines = val
						.map((line) =>
							line
								.replace(/^[-–•;•\s]*/, '')
								.replace(/[;,-]/g, '')
								.trim(),
						)
						.filter((line) => typeof line === 'string' && line.trim().length > 0);
				}

				const uniqueLines = Array.from(new Set(lines));

				return uniqueLines;
			})
			.refine((val) => val.length > 0, {
				message: messages.required,
			}),
	};

	const translates = createTranslatesShape(baseTranslateShape);

	return z.object({
		card_type: z.enum([CardVariants.COMPATRIOT, CardVariants.TOURIST], {
			required_error: messages.required,
		}),
		status: z.enum(['enable', 'disable']).default('enable').readonly(),
		price: z.preprocess(
			(val) => {
				if (val === '' || val === undefined || val === null) return null;
				const num = Number(val);
				return Number.isNaN(num) ? val : num;
			},
			z.number({ invalid_type_error: messages.gt_0 }).positive({ message: messages.gt_0 }),
		),

		translates: z.object(translates),
	});
};

export const createTariffSchema = (messages: ViewModel['Validation']) => {
	const schema = tariffFormShape(messages);

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: DTOEmptyTariffFields,
		reValidateMode: 'onChange',
	});

	return form;
};

export type TariffFormValues = z.infer<ReturnType<typeof tariffFormShape>>;
export type TariffSchema = ReturnType<typeof createTariffSchema>;
