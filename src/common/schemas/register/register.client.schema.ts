'use client';

import { UserRole } from '@business-entities';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const createRegisterClientSchema = (message: ValidationMessages) => {
    const schema = z
        .object({
            email: z.string().email(message.email),
            password: z.string().min(6, message.password),
            confirm_password: z.string().min(6, message.password),
            role: z.nativeEnum(UserRole).default(UserRole.CLIENT),
        })
        .refine((data) => data.password === data.confirm_password, {
            message: message.confirm_password,
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
    });

    return form;
};

type ValidationMessages = {
    email: string;
    password: string;
    confirm_password: string;
};

type DefaultValues = {
    email: '';
    password: '';
    confirm_password: '';
    role: UserRole;
};
