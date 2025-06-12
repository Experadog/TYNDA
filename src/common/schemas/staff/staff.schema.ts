'use client';

import { DTOStaffEmptyFields } from '@/dto/dtoEmpty';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { emptyToNull, passwordPatterns } from '../common/common-rules';

export const staffFormShape = (messages: ViewModel['Validation'], isUpdating: boolean) => {
	return z.object({
		email_name: isUpdating
			? z.string().optional()
			: z.string({ required_error: messages.required }).min(1, { message: messages.min_1 }),

		password: isUpdating
			? z.string().optional()
			: z
					.string({ required_error: messages.required })
					.and(
						passwordPatterns(messages.invalid_password).min(8, {
							message: messages.min_8,
						}),
					),

		permission_groups: z.array(z.string()).optional(),

		first_name: z.preprocess(emptyToNull, z.string().nullable().optional()),

		last_name: z.preprocess(emptyToNull, z.string().nullable().optional()),

		staff_establishment_id: z.string().optional(),
		avatar: z
			.union([z.instanceof(File), z.string()])
			.nullable()
			.optional(),
	});
};

export const createStaffSchema = (messages: ViewModel['Validation'], isUpdating: boolean) => {
	const schema = staffFormShape(messages, isUpdating);

	type FormValues = z.infer<typeof schema>;

	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: DTOStaffEmptyFields,
		reValidateMode: 'onChange',
	});

	return form;
};

export type StaffFormValues = z.infer<ReturnType<typeof staffFormShape>>;
export type StaffSchema = ReturnType<typeof createStaffSchema>;
