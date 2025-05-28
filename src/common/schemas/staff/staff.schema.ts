'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { emptyToNull } from '../common/common-rules';

export const staffFormShape = (messages: ViewModel['Validation'], isCreation: boolean) => {
	return z.object({
		email_name: isCreation
			? z.string({ required_error: messages.required }).min(1, { message: messages.required })
			: z.string().optional(),

		password: isCreation
			? z.string({ required_error: messages.required }).min(1, { message: messages.required })
			: z.string().optional(),

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

export const createStaffSchema = (
	messages: ViewModel['Validation'],
	defaultValues: StaffFormValues | null,
	isCreation: boolean,
) => {
	const schema = staffFormShape(messages, isCreation);

	type FormValues = z.infer<typeof schema>;

	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: defaultValues ?? staffSchemaDefaultValue,
		reValidateMode: 'onChange',
	});

	return form;
};

export const staffSchemaDefaultValue: StaffFormValues = {
	email_name: '',
	permission_groups: [],
	staff_establishment_id: '',
	first_name: '',
	last_name: '',
	password: '',
	avatar: '',
};

export type StaffFormValues = z.infer<ReturnType<typeof staffFormShape>>;
export type StaffSchema = ReturnType<typeof createStaffSchema>;
