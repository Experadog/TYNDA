'use client';

import { DTOEmptyTariffFields } from '@/dto/dtoEmpty';
import { CardVariants } from '@business-entities';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { isoDateSchema } from '../common/common-rules';

const cardFormShape = (messages: ViewModel['Validation']) => {
	return z.object({
		type: z.enum([CardVariants.COMPATRIOT, CardVariants.TOURIST], {
			required_error: messages.required,
		}),
		status: z.enum(['enable', 'disable']).default('enable').readonly(),
		expire_date: isoDateSchema(messages.invalid_date),
		tariff_id: z.string().readonly(),
	});
};

export const createCardSchema = (messages: ViewModel['Validation']) => {
	const schema = cardFormShape(messages);

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: DTOEmptyTariffFields,
		reValidateMode: 'onChange',
	});

	return form;
};

export type CardFormValues = z.infer<ReturnType<typeof cardFormShape>>;
export type CardSchema = ReturnType<typeof createCardSchema>;
