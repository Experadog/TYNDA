'use client';

import { Link } from '@/i18n/routing';
import { PAGES } from '@/lib';
import { UserRole } from '@business-entities';
import { Translate } from '@components';
import { FC } from 'react';
import RegisterClientForm from '../_components/register-client-form';
import RegisterConfirmDialog from '../_components/register-confirm-dialog';
import RegisterPartnerForm from '../_components/register-establisher-form';
import RegisterSwitcher from '../_components/register-switcher';
import { useRegisterUseCase } from '../use-case/useRegisterUseCase';

interface IProps {}

const RegisterView: FC<IProps> = ({}) => {
    const { states, actions } = useRegisterUseCase();
    const { role } = states;
    const { onChangeRole } = actions;

    return (
        <div className='flex flex-col gap-10'>
            <Translate
                direction='right'
                distance={100}
            >
                <div className='flex flex-col gap-3'>
                    <h1 className='text-foreground_1 text-2xl font-semibold'>Создайте новую учетную запись</h1>
                    <span className='text-gray'>
                        У вас уже есть существующий аккаунт?{' '}
                        <Link
                            href={PAGES.LOGIN}
                            className='text-yellow font-semibold ml-2'
                        >
                            Войти
                        </Link>
                    </span>
                </div>
                <Translate
                    direction='right'
                    distance={100}
                    key={role}
                >
                    {role === UserRole.CLIENT && <RegisterClientForm />}
                    {role === UserRole.ESTABLISHER && <RegisterPartnerForm />}
                </Translate>
            </Translate>

            <Translate
                direction='up'
                distance={150}
                duration={1.3}
            >
                <RegisterSwitcher
                    onChangeRole={onChangeRole}
                    role={role}
                />
            </Translate>

            <RegisterConfirmDialog />
        </div>
    );
};

export default RegisterView;
