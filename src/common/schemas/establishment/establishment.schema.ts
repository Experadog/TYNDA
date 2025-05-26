'use client';

import {
	ESTABLISHMENTS_CATEGORIES,
	type EstablishmentCategory,
	type EstablishmentDetailedDefaultValue,
} from '@/business-entities/establishment/EstablishmentEntity';
import { SOCIAL_MEDIAS } from '@/lib';
import { useUser } from '@/providers/user/user-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createTranslatesShape, emptyToNull, fileOrString } from '../common/common-rules';

const establishmentFormShape = (messages: ViewModel['Validation']) => {
	const { user } = useUser();
	const isSuperUser = user?.is_superuser || false;

	const baseTranslateShape = {
		name: z
			.string({ message: messages.required })
			.min(3, messages.min_3)
			.max(100, messages.max_100),
		description: z.string({ message: messages.required }).min(20, messages.min_20),
	};

	const translates = createTranslatesShape(baseTranslateShape);

	return z
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

			establisher: z.string().optional(),

			contacts: z
				.object(
					Object.keys(SOCIAL_MEDIAS).reduce(
						(acc, key) => {
							if (key === 'phone') {
								acc[key as keyof typeof SOCIAL_MEDIAS] = z
									.string()
									.nullable()
									.optional();
							} else {
								acc[key as keyof typeof SOCIAL_MEDIAS] = z
									.string()
									.nullable()
									.optional()
									.refine(
										(val) => {
											if (!val) return true;
											try {
												new URL(val);
												return true;
											} catch {
												return false;
											}
										},
										{ message: messages.invalid_url },
									);
							}
							return acc;
						},
						{} as Record<keyof typeof SOCIAL_MEDIAS, z.ZodTypeAny>,
					),
				)
				.optional(),

			coordinates: z
				.object({
					latitude: z.number().optional(),
					longitude: z.number().optional(),
				})
				.refine((data) => data.latitude !== undefined && data.longitude !== undefined, {
					message: messages.coordinates_required,
				}),

			translates: z.object(translates),
			website: z.preprocess(
				emptyToNull,
				z.string().url({ message: messages.invalid_url }).nullable().optional(),
			),

			email: z.preprocess(
				emptyToNull,
				z.string().email({ message: messages.invalid_email }).nullable().optional(),
			),

			work_time_start: z.string().refine(Boolean, { message: messages.required }),
			work_time_end: z.string().refine(Boolean, { message: messages.required }),

			images: z.array(fileOrString).min(1, { message: messages.images_required }),
			cover: z
				.union([z.instanceof(File), z.string()])
				.nullable()
				.optional()
				.refine((val) => Boolean(val), { message: messages.cover_required }),

			average_bill: z.preprocess((val) => {
				if (val === '' || val === undefined || val === null) return null;
				const num = Number(val);
				return Number.isNaN(num) ? val : num;
			}, z
				.number({ invalid_type_error: messages.gt_0 })
				.positive({ message: messages.gt_0 })
				.nullable()
				.optional()),

			discount: z
				.preprocess(
					(val) => (val === '' || val === undefined ? undefined : Number(val)),
					z.number({
						required_error: messages.required,
						invalid_type_error: messages.gt_0,
					}),
				)
				.refine((val) => val > 0, { message: messages.gt_0 })
				.refine((val) => val < 100, { message: messages.lt_100 }),
		})
		.transform((data) => ({
			...data,
			name: data.translates?.ru?.name ?? '',
		}))
		.superRefine((data, ctx) => {
			if (isSuperUser) {
				if (!data.establisher) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: messages.required,
						path: ['establisher'],
					});
				}
			} else {
				if ('establisher' in data) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Establisher must not be present for non-superusers',
						path: ['establisher'],
					});
				}
			}
		});
};

export const createEstablishmentSchema = (
	messages: ViewModel['Validation'],
	detailedDefaultValue?: EstablishmentFormValues | undefined,
) => {
	const schema = establishmentFormShape(messages);

	type FormValues = z.infer<typeof schema>;

	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: detailedDefaultValue ?? defaultValue,
		reValidateMode: 'onChange',
	});

	return form;
};

export const defaultValue: EstablishmentDetailedDefaultValue = {
	name: '',
	address: '',
	category: undefined,
	contacts: {},
	coordinates: {},
	translates: {},
	website: '',
	email: '',
	average_bill: undefined,
	work_time_start: '',
	work_time_end: '',
	images: [],
	cover: undefined,
	discount: undefined,
};

export type EstablishmentFormValues = z.infer<ReturnType<typeof establishmentFormShape>>;
export type EstablishmentSchema = ReturnType<typeof createEstablishmentSchema>;
