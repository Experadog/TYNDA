import { ImgMask } from '@components';

const Hero = () => {
	return (
		<div className="relative overflow-hidden rounded-3xl">
			<div className='bg-[url("/profile/profile.webp")] h-64 rounded-3xl bg-center bg-cover bg-no-repeat' />
			<ImgMask />
		</div>
	);
};

export default Hero;
