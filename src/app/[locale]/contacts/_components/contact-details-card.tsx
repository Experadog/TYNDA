'use client';
import { Link } from '@/i18n/routing';
import { SOCIAL_MEDIAS } from '@/lib';
import Image from 'next/image';
import { FC } from 'react';
import { BsGeoAlt } from 'react-icons/bs';
import { CgInfo } from 'react-icons/cg';
import { LiaPhoneSolid } from 'react-icons/lia';
import { LuMail } from 'react-icons/lu';
import { TbMessageDots } from 'react-icons/tb';

const icons = [
    BsGeoAlt,
    LiaPhoneSolid,
    LuMail,
    TbMessageDots,
    CgInfo,
]

interface IProps {
    id: number;
    description: string;
    contactDetails: ViewModel['Contacts']['contactDetails']
    index: number;
}

const ContactDetailsCard: FC<IProps> = ({ description, id, contactDetails, index }) => {
    const IconComponent = icons[id];
    return (
        <div
            key={id}
            className={`flex flex-col items-center px-4 py-5 gap-9 shadow-[0_0_15px_2px_rgba(41,53,61,0.20)] bg-background_1 rounded-[20px] numeric ${id === 3 ? 'gap-[15px]' : 'gap-9'}`}
        >
            <div className="flex flex-col items-center gap-6">
                <div className='bg-yellow p-4 rounded-full'>
                    {/* <BsGeoAlt className='text-white w-6 h-6' /> */}
                    <IconComponent className='text-white w-6 h-6' />
                </div>
                <div>
                    <p className='text-xl font-medium'>{contactDetails[index]}</p>
                </div>
            </div>
            <div>
                {id === 3 ? (
                    <div className="flex items-cener gap-5">
                        <div className="flex items-center gap-2">
                            <Link
                                key={'telegram'}
                                href={'telegram'}
                                target="_blank"
                                className="bg-yellow rounded-full p-2 hover:scale-105 transition-transform"
                            >
                                <Image
                                    width={16}
                                    height={16}
                                    alt={'telegram'}
                                    src={SOCIAL_MEDIAS['telegram'].icon}
                                    className="h-4 w-4"
                                />
                            </Link>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link
                                key={'whatsApp'}
                                href={'whatsApp'}
                                target="_blank"
                                className="bg-yellow rounded-full p-2 hover:scale-105 transition-transform"
                            >
                                <Image
                                    width={16}
                                    height={16}
                                    alt={'whatsApp'}
                                    src={SOCIAL_MEDIAS['whatsApp'].icon}
                                    className="h-4 w-4"
                                />
                            </Link>
                        </div>
                    </div>
                ) : (
                    <p className='text-foreground_2 text-base font-semibold'>{description}</p>
                )}
            </div>
        </div>
    );
};

export default ContactDetailsCard;
