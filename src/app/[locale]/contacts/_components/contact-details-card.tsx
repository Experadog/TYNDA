'use client';
import Image from 'next/image';
import { FC } from 'react';
import { BsGeoAlt } from 'react-icons/bs';

interface IProps {
    id: number;
    title: string;
    description: string;
}

const ContactDetailsCard: FC<IProps> = ({ title, description, id }) => {
    return (
        <div
            key={id}
            className='flex flex-col items-center px-4 py-5 gap-9 shadow-[0_0_15px_2px_rgba(41,53,61,0.20)] bg-background_1 rounded-[20px] numeric'
        >
            <div className='flex flex-col items-center gap-6'>
                <div className='bg-yellow p-4 rounded-full'>
                    <BsGeoAlt className='text-white w-6 h-6' />
                </div>
                <div>
                    <p className='text-xl font-medium'>{title}</p>
                </div>
            </div>
            <div>
                <p className='text-foreground_2 text-base font-semibold'>{description}</p>
            </div>
        </div>
    );
};

export default ContactDetailsCard;
