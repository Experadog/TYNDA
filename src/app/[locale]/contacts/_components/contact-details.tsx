'use client';
import { FC } from 'react';
import ContactDetailsCard from './contact-details-card';

interface IProps {}

const contactsData = [
    { id: 0, title: 'Адрес', description: 'Юсупа Абдрахманова, 119' },
    { id: 1, title: 'Телефон', description: '+996 551 888 850' },
    { id: 2, title: 'Почта', description: 'info@soyuz.kg' },
    { id: 3, title: 'Связь', description: 'Иконка телеги' },
    { id: 4, title: 'Консультация', description: 'ПН-СБ 09:00 - 18:00' },
];

const ContactDetails: FC<IProps> = ({}) => {
    return (
        <div className='grid grid-cols-5 lg:grid-cols-1 gap-[10px] justify-between mt-[70px] md:mt-5'>
            {contactsData.map((item) => (
                <ContactDetailsCard
                    key={item.id}
                    {...item}
                />
            ))}
        </div>
    );
};

export default ContactDetails;
