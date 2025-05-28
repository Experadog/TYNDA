'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { emptyToNull } from '../common/common-rules';

export const userFormShape = (messages: ViewModel['Validation']) => {
	return z.object({
		email: z.string({ required_error: messages.required }).email(messages.invalid_email),

		password: z
			.string({ required_error: messages.required })
			.min(1, { message: messages.required }),

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

export const createUserSchema = (messages: ViewModel['Validation']) => {
	const schema = userFormShape(messages);

	type FormValues = z.infer<typeof schema>;

	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: userSchemaDefaultValue,
		reValidateMode: 'onChange',
	});

	return form;
};

export const userSchemaDefaultValue: UserFormValues = {
	email: '',
	permission_groups: [],
	staff_establishment_id: '',
	first_name: '',
	last_name: '',
	password: '',
	avatar: '',
};

export type UserFormValues = z.infer<ReturnType<typeof userFormShape>>;
export type UserSchema = ReturnType<typeof createUserSchema>;
