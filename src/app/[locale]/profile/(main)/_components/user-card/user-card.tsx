'use client';

import { Link } from '@/i18n/routing';
import { phoneFormatter } from '@/lib';
import { useUser } from '@/providers/user/user-provider';
import { Button, TariffCard, Translate } from '@components';
import { FC } from 'react';
import { SlPencil } from 'react-icons/sl';

interface IProps {}

const UserCard: FC<IProps> = ({}) => {
    const { user } = useUser();

    return (
        <Translate
            distance={150}
            direction='right'
            className='bg-background_1 w-full max-w-[416px] z-10 rounded-3xl p-6 shadow-md -mt-52 flex-shrink-0'
        >
            <div className='relative flex flex-col w-full items-center'>
                <div className='flex items-center flex-col w-full relative'>
                    <div className={`bg-[url(/auth.webp)] bg-cover size-28 absolute rounded-full -top-11`}>
                        <Button
                            variant={'yellow'}
                            className='size-9 absolute bottom-0 right-0 z-10 p-0 text-4xl font-extralight text-white rounded-full'
                        >
                            +
                        </Button>
                    </div>
                </div>

                <div className='flex flex-col items-center mt-20'>
                    <div className='flex items-center gap-1'>
                        <h3 className='text-foreground_1 font-semibold text-xl'>
                            {user?.first_name} {user?.last_name}
                        </h3>
                        <div className='bg-[url("/profile/check.svg")] size-5 bg-cover' />
                    </div>
                    <div className='flex flex-col gap-1 mt-4 items-center'>
                        <h4 className='text-foreground_1 font-semibold text-sm  numeric'>{phoneFormatter(user?.phone)}</h4>
                        <h4 className='text-foreground_1 font-semibold text-sm  numeric'>{user?.email}</h4>
                    </div>
                </div>

                <div className='flex flex-col gap-3 items-center w-full mt-5'>
                    <TariffCard
                        isActive={true}
                        data={{}}
                    />
                    <div className='flex flex-col gap-1 w-full px-3'>
                        <div className='flex items-center justify-between'>
                            <span className='text-foreground_1 text-base font-semibold'>Туристическая</span>
                            <span className='text-foreground_1 text-base font-semibold text-end numeric'>24/09</span>
                        </div>

                        <div className='flex items-center justify-between'>
                            <span className='text-foreground_1 text-sm font-light'>Ваш план</span>
                            <span className='text-foreground_1 text-sm font-light text-end numeric'>Дата истечения</span>
                        </div>
                    </div>
                </div>

                <Link
                    href={'/'}
                    className='bg-yellow text-white rounded-2xl text-base font-semibold w-full mt-6 p-3 text-center flex items-center gap-2 justify-center'
                >
                    <SlPencil />
                    Редактировать профиль
                </Link>
            </div>
        </Translate>
    );
};

export default UserCard;
