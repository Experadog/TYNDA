'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const createLoginSchema = (message: ValidationMessages) => {
    const schema = z.object({
        email: z.string().email(message.email),
        password: z.string().min(6, message.password),
    });

    const defaultValues: DefaultValues = {
        email: '',
        password: '',
    };

    type FormValues = z.infer<typeof schema>;

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    return form;
};

type ValidationMessages = {
    email: string;
    password: string;
};

type DefaultValues = {
    email: string;
    password: string;
};
