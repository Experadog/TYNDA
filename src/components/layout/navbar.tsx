import { Link } from '@/i18n/routing';
import { NAV_LINKS } from '@/lib';
import { Button, ToggleLocale, ToggleTheme, Translate } from '@components';
import clsx from 'clsx';
import Image from 'next/image';
import { type FC, useState } from 'react';
import { CgInfo } from 'react-icons/cg';
import { IoClose } from 'react-icons/io5';
import { LiaPhoneSolid } from 'react-icons/lia';
import { LuCreditCard } from 'react-icons/lu';
import { RiHome6Line } from 'react-icons/ri';
import { RxHamburgerMenu } from 'react-icons/rx';
import { TbMapSearch } from 'react-icons/tb';
import MobileNavbar from './mobile-navbar';
import { useNavbarUseCase } from './use-cases/useNavbarUseCase';
import { useScrolled } from './use-cases/useScrolled';

interface IProps {
	viewModel: ViewModel['Layout']['navbar'];
}

export const navbarIcons = [
	<RiHome6Line className="w-[18px] h-[18px]" key={'1'} />,
	<TbMapSearch className="w-[18px] h-[18px] " key={'2'} />,
	<CgInfo className="w-[18px] h-[18px]" key={'3'} />,
	<LiaPhoneSolid className="w-[18px] h-[18px]" key={'4'} />,
	<LuCreditCard className="w-[18px] h-[18px]" key={'5'} />,
];

const Navbar: FC<IProps> = () => {
	const { navigateToAuthOrProfile, user, viewModel, shouldHighlightLink, shouldHighlightBtn } =
		useNavbarUseCase();

	const isScrolled = useScrolled(10);

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	return (
		<div
			className={clsx(
				'bg-background_1 flex flex-col fixed z-[9999] top-0 right-0 left-0 transition-shadow duration-1000 border-b border-b-light_gray max-w-[1920px] mx-auto',
				isScrolled && 'shadow-lg border-none',
			)}
		>
			<Translate
				direction="down"
				animateOnce
				distance={100}
				className="flex items-center px-10 xs:px-5 py-5 gap-8 justify-between"
			>
				<div className="flex items-center gap-16">
					<Link href={'/'} className="w-[50px] h-[48px] relative">
						<Image
							src={'/logo.svg'}
							alt="Логотип"
							fill
							priority
							className="w-auto h-auto"
						/>
					</Link>

					<nav
						className={clsx(
							'flex items-center gap-7 xl:gap-4 whitespace-nowrap lg:hidden',
						)}
					>
						{NAV_LINKS.map((path, index) => (
							<Link
								key={path}
								href={path}
								className={clsx(
									'font-semibold uppercase text-sm hover:text-yellow',
									shouldHighlightLink(path) && 'text-yellow',
								)}
							>
								<div className="flex items-center gap-[10px]">
									{navbarIcons[index]}
									{viewModel.navbar.links[index]}
								</div>
							</Link>
						))}
					</nav>
				</div>

				<nav className="flex items-center gap-5 xl:gap-3 exs:gap-3 relative ml-auto">
					<ToggleTheme />
					<ToggleLocale />
					<Button
						onClick={navigateToAuthOrProfile}
						disableAnimation
						className={clsx(
							'bg-transparent uppercase text-foreground_1 font-semibold shadow-none p-5 rounded-3xl border-foreground_1  border cursor-pointer hover:bg-yellow hover:border-background_1 hover:text-white lg:hidden text-xs numeric',
							shouldHighlightBtn && 'bg-yellow  border-background_1 text-white',
						)}
					>
						{user ? user.email : viewModel.navbar.button1}
					</Button>

					{/* Бургер-меню для мобильных устройств */}
					<div className="lg:flex hidden items-center ml-auto">
						<Button
							onClick={toggleMenu}
							disableAnimation
							className="shadow-none bg-transparent p-0"
							size={'default'}
						>
							<div>{isMenuOpen ? <IoClose /> : <RxHamburgerMenu />}</div>
						</Button>
					</div>
				</nav>
			</Translate>

			<Translate
				open={isMenuOpen}
				onExit={{ direction: 'left', distance: 300 }}
				direction="left"
				distance={200}
				duration={0.5}
				className="fixed inset-x-0 top-[87px] bottom-0 max-h-full bg-background_1 px-5 py-10 flex flex-col overflow-y-scroll"
			>
				<MobileNavbar onClose={setIsMenuOpen} />
			</Translate>
		</div>
	);
};

export default Navbar;
