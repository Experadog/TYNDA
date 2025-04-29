'use client';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import Hero from './_components/hero';

const ContactDetails = dynamic(() => import('./_components/contact-details'), { ssr: true });

const Address = dynamic(() => import('./_components/address'), { ssr: true });

const ContactForm = dynamic(() => import('./_components/contact-form'), { ssr: true });

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
