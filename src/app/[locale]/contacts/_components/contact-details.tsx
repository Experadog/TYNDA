'use client';
import type { FC } from 'react';
import ContactDetailsCard from './contact-details-card';

interface IProps {
	contactDetails: ViewModel['Contacts']['contactDetails'];
}

const contactsData = [
	{ id: 0, description: 'Юсупа Абдрахманова, 119' },
	{ id: 1, description: '+996 (500) 445 744' },
	{ id: 2, description: 'tyndatourism@gmail.com' },
	{ id: 3, description: 'Иконка телеги' },
	{ id: 4, description: 'ПН-СБ 09:00 - 18:00' },
];

const ContactDetails: FC<IProps> = ({ contactDetails }) => {
	return (
		<div className="grid grid-cols-5 lg:grid-cols-1 gap-[10px] justify-between mt-[70px] md:mt-5">
			{contactsData.map((item, index) => (
				<ContactDetailsCard
					contactDetails={contactDetails}
					key={item.id}
					{...item}
					index={index}
				/>
			))}
		</div>
	);
};

export default ContactDetails;
