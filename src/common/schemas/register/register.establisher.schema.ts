'use client';

import { UserRole } from '@business-entities';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const createRegisterEstablisherSchema = (
    message: ValidationMessages,
) => {
    const schema = z
        .object({
            first_name: z.string().min(1, message.first_name),
            last_name: z.string().min(1, message.last_name),
            email: z.string().email(message.email),
            password: z.string().min(6, message.password),
            confirm_password: z.string().min(6, message.password),
            role: z.nativeEnum(UserRole).default(UserRole.ESTABLISHER),
        })
        .refine((data) => data.password === data.confirm_password, {
            message: message.confirm_password,
            path: ['confirm_password'],
        });

    const defaultValues: DefaultValues = {
        confirm_password: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        role: UserRole.ESTABLISHER,
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
    first_name: string;
    last_name: string;
};

type DefaultValues = {
    email: '';
    password: '';
    confirm_password: '';
    first_name: '';
    last_name: '';
    role: UserRole;
};
