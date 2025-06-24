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
		first_name: z.string().optional(),
		last_name: z.string().optional(),
		phone: z
			.string()
			.optional()
			.transform((val) => {
				if (!val) return val;

				let cleaned = val.replace(/[^\d+]/g, '').trim();

				if (cleaned.startsWith('+996')) {
					cleaned = `+996${cleaned.slice(4, 13)}`;
				}

				return cleaned;
			}),

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
