'use client';

import {
	ESTABLISHMENTS_CATEGORIES,
	type EstablishmentCategory,
	type EstablishmentDetailedDefaultValue,
} from '@/business-entities/establishment/EstablishmentEntity';
import { type SupportedLanguages, supportedLanguages } from '@/i18n/routing';
import { SOCIAL_MEDIAS } from '@/lib';
import { useUser } from '@/providers/user/user-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createTranslatesShape, emptyToNull, fileOrString } from '../common/common-rules';

const establishmentFormShape = (
	messages: ViewModel['Validation'],
	shouldValidEst: boolean,
	shouldValidEstID: boolean,
) => {
	const baseTranslateShape = {
		name: z
			.string({ message: messages.required })
			.min(3, messages.min_3)
			.max(100, messages.max_100),
		description: z.string({ message: messages.required }).min(20, messages.min_20),
	};

	const establisherSchema = z.object({
		email: z.string({ required_error: messages.required }).email(messages.invalid_email),
		password: z.string({ required_error: messages.required }).min(6, messages.min_3),
		first_name: z.preprocess(emptyToNull, z.string().nullable().optional()),
		last_name: z.preprocess(emptyToNull, z.string().nullable().optional()),
		permission_groups: z.array(z.string()).optional(),
		staff_establishment_id: z.string().optional(),
	});

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

			establisher_id:
				shouldValidEst && shouldValidEstID
					? z.string({ required_error: messages.create_or_select_establisher })
					: z.string().optional(),
			establisher:
				shouldValidEst && !shouldValidEstID
					? establisherSchema
					: establisherSchema.partial().optional(),

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

			coordinates: z.object({
				latitude: z.preprocess(
					(val) => {
						if (!val) return undefined;
						const num = Number(val);
						return Number.isNaN(num) ? undefined : num;
					},
					z
						.number({ required_error: messages.required })
						.min(-90, { message: messages.invalid_coordinates })
						.max(90, { message: messages.invalid_coordinates }),
				),
				longitude: z.preprocess(
					(val) => {
						if (!val) return undefined;
						const num = Number(val);
						return Number.isNaN(num) ? undefined : num;
					},
					z
						.number({ required_error: messages.required })
						.min(-180, { message: messages.invalid_coordinates })
						.max(180, { message: messages.invalid_coordinates }),
				),
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
					(val) => {
						if (val === '' || val === undefined || val === null) {
							return 0;
						}
						return Number(val);
					},
					z
						.number({
							invalid_type_error: messages.gt_0,
						})
						.refine((val) => val >= 0, { message: messages.gt_0 }) // теперь >=0, чтобы 0 тоже прошло
						.refine((val) => val < 100, { message: messages.lt_100 }),
				)
				.optional(),
		})

		.transform((data) => ({
			...data,
			name: data.translates?.ru?.name ?? '',
		}));
};

export const createEstablishmentSchema = (
	messages: ViewModel['Validation'],
	shouldValidateEstablisherID: boolean,
	detailedDefaultValue?: EstablishmentFormValues,
) => {
	const { user } = useUser();

	const shouldValidateEstablisher = Boolean(!detailedDefaultValue && user?.is_superuser);

	const schema = establishmentFormShape(
		messages,
		shouldValidateEstablisher,
		shouldValidateEstablisherID,
	);

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: detailedDefaultValue || defaultValue,
		reValidateMode: 'onChange',
	});

	return form;
};

export const defaultValue: EstablishmentDetailedDefaultValue = {
	name: '',
	address: '',
	category: undefined,
	contacts: {},
	coordinates: {
		latitude: undefined,
		longitude: undefined,
	},
	translates: supportedLanguages.reduce(
		(acc, lang) => {
			acc[lang] = { name: '', description: '' };
			return acc;
		},
		{} as Record<SupportedLanguages, { name: string; description: string }>,
	),
	website: '',
	email: '',
	average_bill: undefined,
	work_time_start: '',
	work_time_end: '',
	images: [],
	cover: undefined,
	discount: undefined,
	establisher: undefined,
	establisher_id: undefined,
};

export type EstablishmentFormValues = z.infer<ReturnType<typeof establishmentFormShape>>;
export type EstablishmentSchema = ReturnType<typeof createEstablishmentSchema>;
