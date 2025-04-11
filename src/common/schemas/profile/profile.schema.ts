'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface CreateProfileSchemaProps {
    message: ValidationMessages;
    defaultValues: {
        first_name: string;
        last_name: string;
        phone: string;
    };
}

export const createProfileSchema = ({
    message,
    defaultValues,
}: CreateProfileSchemaProps) => {
    const schema = z.object({
        first_name: z.string().min(1, message.first_name).optional(),
        last_name: z.string().min(1, message.last_name).optional(),
        phone: z.string().optional(),
    });

    type FormValues = z.infer<typeof schema>;

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    return form;
};

type ValidationMessages = {
    first_name: string;
    last_name: string;
    phone: string;
};
