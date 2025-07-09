'use client';
import { Button } from '@components';
import type { FC } from 'react';

interface IProps {
	contactForm: ViewModel['Contacts']['contactForm'];
	classNameForm?: string;
}

const ContactForm: FC<IProps> = ({ contactForm, classNameForm }) => {
	return (
		<div className={`my-[100px] lg:my-[60px] flex flex-col gap-[60px] ${classNameForm}`}>
			<div className="flex lg:flex-wrap items-center gap-8">
				<h3 className="text-4xl lg:text-2xl font-medium">{contactForm.contactUs}</h3>
				<p className="opacity-70 text-base font-normal max-w-[357px]">
					{contactForm.questions}
				</p>
			</div>

			<div className="grid grid-cols-2 lg:grid-cols-1">
				<form className="flex flex-col items-start w-full gap-[14px]">
					<div
						style={{ borderBottom: '1.5px solid rgba(14, 14, 14, 0.20)' }}
						className="flex flex-col gap-[10px] w-full pb-[10px]"
					>
						{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
						<label className="text-lg w-full">{contactForm.name}</label>
						<input
							name="name"
							type="text"
							placeholder={contactForm.name}
							required
							autoComplete="name"
							className="w-full outline-none numeric bg-inherit"
						/>
					</div>
					<div
						style={{ borderBottom: '1.5px solid rgba(14, 14, 14, 0.20)' }}
						className="flex flex-col gap-[10px] w-full pb-[10px]"
					>
						{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
						<label className="text-lg w-full">{contactForm.phone}</label>
						<input
							name="phone"
							type="tel"
							placeholder={contactForm.enterPhone}
							required
							autoComplete="tel"
							className="w-full outline-none numeric bg-inherit"
						/>
					</div>
					<div
						style={{ borderBottom: '1.5px solid rgba(14, 14, 14, 0.20)' }}
						className="flex flex-col gap-[10px] w-full pb-[10px]"
					>
						{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
						<label className="text-lg w-full">{contactForm.email}</label>
						<input
							name="email"
							type="email"
							placeholder={contactForm.email}
							required
							autoComplete="email"
							className="w-full outline-none numeric bg-inherit"
						/>
					</div>
					<div
						style={{ borderBottom: '1.5px solid rgba(14, 14, 14, 0.20)' }}
						className="flex flex-col gap-[10px] w-full pb-[10px]"
					>
						{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
						<label className="text-lg w-full">{contactForm.message}</label>
						<textarea
							name="message"
							required
							autoComplete="off"
							className="w-full outline-none min-h-[20px] numeric bg-inherit"
							placeholder={contactForm.enterMessage}
						/>
					</div>
					<Button
						type="submit"
						variant={'yellow'}
						className="my-8 w-full rounded-3xl p-6"
					>
						{contactForm.send}
					</Button>
				</form>
			</div>
		</div>
	);
};

export default ContactForm;
