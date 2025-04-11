'use client';
import { FC } from 'react';
import Hero from './_components/hero';
import ContactDetails from './_components/contact-details';
import Address from './_components/address';
import ContactForm from './_components/contact-form';

interface IProps {}

const ContactsView: FC<IProps> = ({}) => {
    return (
        <>
            <Hero />
            <div className='px-14 lg:px-5 max-w-[1340px] m-auto'>
                <ContactDetails />
                <Address />
                <ContactForm />
            </div>
        </>
    );
};

export default ContactsView;
