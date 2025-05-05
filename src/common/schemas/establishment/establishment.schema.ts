'use client';

import {
	ESTABLISHMENTS_CATEGORIES,
	type EstablishmentCategory,
} from '@/business-entities/establishment/EstablishmentEntity';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createTranslatesShape } from '../common/common-rules';

export const createEstablishmentSchema = (messages: ViewModel['Validation']) => {
	const baseTranslateShape = {
		name: z.string().min(3, messages.min_3).max(100, messages.max_100),
		description: z.string().min(20, messages.min_20),
	};

	const translates = createTranslatesShape(baseTranslateShape);

	const schema = z
		.object({
			name: z.string().readonly(),
			address: z.string().min(3, messages.min_3).max(100, messages.max_100),

			category: z.enum(
				[...Object.values(ESTABLISHMENTS_CATEGORIES)] as [
					EstablishmentCategory,
					...EstablishmentCategory[],
				],
				{ required_error: messages.required },
			),

			contacts: z.object({
				phone: z.string().refine(Boolean, { message: messages.required }),
				telegram: z.string().optional(),
			}),

			coordinates: z.object({
				lat: z.string().refine(Boolean, { message: messages.required }),
				lon: z.string().refine(Boolean, { message: messages.required }),
			}),

			translates: z.object(translates),

			website: z.string().url({ message: messages.invalid_url }).optional(),

			email: z.string().email({ message: messages.invalid_email }).optional(),

			average_bill: z
				.number()
				.or(z.string())
				.refine((val) => typeof val === 'string' && Number(val) > 0, {
					message: messages.gt_0,
				}),

			work_time_start: z.string().refine(Boolean, { message: messages.required }),
			work_time_end: z.string().refine(Boolean, { message: messages.required }),

			images: z.array(z.instanceof(File)).min(1, { message: messages.required }),

			cover: z.instanceof(File).nullable().refine(Boolean, { message: messages.required }),

			discount: z
				.number()
				.or(z.string())
				.refine((val) => typeof val === 'string' && Number(val) > 0, {
					message: messages.gt_0,
				}),
		})
		.transform((data) => ({
			...data,
			name: data.translates?.ru?.name ?? '',
		}));

	type FormValues = z.infer<typeof schema>;

	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: defaultValues,
	});

	return form;
};

const defaultValues = {
	name: '',
	address: '',
	category: undefined,
	contacts: {
		phone: '',
		telegram: '',
	},
	coordinates: {
		lat: '',
		lon: '',
	},
	translates: {
		ru: {
			name: '',
			description: '',
		},

		en: {
			name: '',
			description: '',
		},

		kg: {
			name: '',
			description: '',
		},
	},
	website: '',
	email: '',
	average_bill: '',
	work_time_start: '',
	work_time_end: '',
	images: [],
	cover: undefined,
	discount: '',
};
