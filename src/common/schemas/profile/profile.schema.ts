'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface CreateProfileSchemaProps {
	message: ViewModel['Validation'];
	defaultValues: {
		first_name: string;
		last_name: string;
		phone?: string;
		avatar?: string;
	};
}

export const profileFormShape = (messages: ViewModel['Validation']) => {
	return z.object({
		first_name: z.string().min(2, messages.required).optional(),
		last_name: z.string().min(2, messages.required).optional(),
		phone: z.string().optional(),
		avatar: z
			.union([z.instanceof(File), z.string()])
			.nullable()
			.optional(),
	});
};

export const createProfileSchema = ({ message, defaultValues }: CreateProfileSchemaProps) => {
	const schema = profileFormShape(message);

	type FormValues = z.infer<typeof schema>;

	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues,
	});

	return form;
};

export type ProfileFormValues = z.infer<ReturnType<typeof profileFormShape>>;
