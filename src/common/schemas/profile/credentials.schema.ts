'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface CreateCredentialsSchemaProps {
    message: {
        old_password: string;
        new_password: string;
        confirm_password: string;
    };
}

const defaultValues = {
    old_password: '',
    new_password: '',
    confirm_password: '',
};

export const createCredentialsSchema = ({ message }: CreateCredentialsSchemaProps) => {
    const schema = z
        .object({
            old_password: z.string().min(1, message.old_password),
            new_password: z.string().min(1, message.new_password),
            confirm_password: z.string().min(1, message.confirm_password),
        })
        .refine((data) => data.new_password === data.confirm_password, {
            message: message.confirm_password,
            path: ['confirm_password'],
        });

    type FormValues = z.infer<typeof schema>;

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    return form;
};
