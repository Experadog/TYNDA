'use client';
import { useViewModel } from '@/i18n/getTranslate';
import dynamic from 'next/dynamic';
import { useContactsUseCase } from '../contacts/use-cases/useContactsUseCase';
import Hero from './_components/hero';

const Conductor = dynamic(() => import('./_components/conductor'), { ssr: true });
const WhyTynda = dynamic(() => import('./_components/whyTynda'), { ssr: true });
const ContactForm = dynamic(() => import('../contacts/_components/contact-form'), { ssr: true });

const AboutView = () => {
	const viewModel = useViewModel(['AboutCompany']);
	const {
		viewModel: { contacts },
	} = useContactsUseCase();
	return (
		<>
			<Hero heroViewModel={viewModel.hero} />
			<div className="xl:px-5 max-w-[1340px] m-auto">
				<Conductor />
				<WhyTynda />
				<ContactForm contactForm={contacts.contactForm} classNameForm="my-[50px]" />
			</div>
		</>
	);
};

export default AboutView;
