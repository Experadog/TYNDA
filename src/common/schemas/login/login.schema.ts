'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const createLoginSchema = (messages: ViewModel['Validation']) => {
	const schema = z.object({
		email: z.string().email(messages.invalid_email),
		password: z.string().min(1, messages.min_1),
	});

	const defaultValues: DefaultValues = {
		email: '',
		password: '',
	};

	type FormValues = z.infer<typeof schema>;

	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues,
		reValidateMode: 'onChange',
	});

	return form;
};

type DefaultValues = {
	email: string;
	password: string;
};
