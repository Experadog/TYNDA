import Image from 'next/image';
import type { FC } from 'react';
import { useLoginUseCase } from '../use-case/useLoginUseCase';

interface IButtonProps {
	imageSrc: string;
	altText: string;
	onClick: () => void;
}

const AuthButton: FC<IButtonProps> = ({ imageSrc, altText, onClick }) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className="bg-light_gray flex items-center justify-center rounded-xl px-4 py-3 flex-1 hover:bg-light_gray"
		>
			<Image src={imageSrc} alt={altText} width={30} height={30} />
		</button>
	);
};

const LoginVia: FC = () => {
	const { loginVia } = useLoginUseCase();

	return (
		<div className="mt-5 flex items-center justify-between w-full gap-7">
			<AuthButton imageSrc="/sm/google.svg" altText="auth-google" onClick={loginVia.google} />
			<AuthButton imageSrc="/sm/yandex.svg" altText="auth-yandex" onClick={loginVia.yandex} />
			<AuthButton imageSrc="/sm/vk.svg" altText="auth-vk" onClick={() => {}} />
		</div>
	);
};

export default LoginVia;
