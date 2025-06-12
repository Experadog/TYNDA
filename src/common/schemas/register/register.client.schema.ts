'use client';

import { UserRole } from '@business-entities';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { passwordPatterns } from '../common/common-rules';

export const createRegisterClientSchema = (messages: ViewModel['Validation']) => {
	const schema = z
		.object({
			email: z.string().email(messages.invalid_email),
			password: z
				.string()
				.min(8, messages.min_8)
				.and(passwordPatterns(messages.invalid_password)),
			confirm_password: z.string().min(8, messages.min_8),
			role: z.nativeEnum(UserRole).default(UserRole.CLIENT),
		})
		.refine((data) => data.password === data.confirm_password, {
			message: messages.password_not_math,
			path: ['confirm_password'],
		});

	const defaultValues: DefaultValues = {
		confirm_password: '',
		email: '',
		password: '',
		role: UserRole.CLIENT,
	};

	type FormValues = z.infer<typeof schema>;

	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues,
		mode: 'all',
	});

	return form;
};

type DefaultValues = {
	email: '';
	password: '';
	confirm_password: '';
	role: UserRole;
};
