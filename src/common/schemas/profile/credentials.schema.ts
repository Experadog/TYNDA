'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface CreateCredentialsSchemaProps {
	message: ViewModel['Validation'];
}

const defaultValues = {
	old_password: '',
	new_password: '',
	confirm_password: '',
};

export const createCredentialsSchema = ({ message }: CreateCredentialsSchemaProps) => {
	const schema = z
		.object({
			old_password: z.string().min(1, message.required),
			new_password: z.string().min(1, message.required),
			confirm_password: z.string().min(1, message.required),
		})
		.refine((data) => data.new_password === data.confirm_password, {
			message: message.password_not_math,
			path: ['confirm_password'],
		});

	type FormValues = z.infer<typeof schema>;

	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues,
	});

	return form;
};
