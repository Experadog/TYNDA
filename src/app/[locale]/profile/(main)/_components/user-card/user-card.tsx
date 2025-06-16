'use client';

import { Link } from '@/i18n/routing';
import { PAGES, phoneFormatter } from '@/lib';
import { useUser } from '@/providers/user/user-provider';
import { Button, TariffCard, Translate } from '@components';
import { SlPencil } from 'react-icons/sl';
import { useProfileSettingsUseCase } from '../../../use-case/profile-use-case';
import AvatarUpdating from '../avatar-updating/avatar-updating';

const UserCard = () => {
	const { user } = useUser();
	const {
		actions: { openAvatarUpdating },
	} = useProfileSettingsUseCase();

	const avatar = user?.avatar || '/other/avatar-placeholder.webp';
	const isCardActive = user?.card?.tariff.status === 'enable' || false;

	return (
		<Translate
			animateOnce
			distance={150}
			direction="right"
			className="
        bg-background_1 w-full z-10 rounded-3xl p-6 shadow-md flex-shrink-0
        -mt-52 sm:-mt-40
        max-w-[416px] sm:max-w-[320px]
        sm:mx-auto
        sm:scale-90
        "
		>
			<div className="relative flex flex-col w-full items-center h-full">
				<div className="flex items-center flex-col w-full relative">
					<div
						className="
              size-28 sm:size-20 
              absolute rounded-full -top-11 sm:-top-8
              bg-cover bg-center
            "
						style={{ backgroundImage: `url(${avatar})` }}
					>
						<Button
							onClick={openAvatarUpdating}
							variant={'yellow'}
							className="
                size-9 sm:size-5
                absolute bottom-0 right-0 z-10 p-0 text-4xl sm:text-xl 
                font-extralight text-white rounded-full
              "
						>
							+
						</Button>
					</div>
				</div>

				<div className="flex flex-col items-center mt-20 sm:mt-14">
					<div className="flex items-center gap-1">
						{user?.first_name && user?.last_name && (
							<div className='bg-[url("/profile/check.svg")] size-5 sm:size-4 bg-cover' />
						)}
						<h3 className="text-foreground_1 font-semibold text-xl sm:text-lg">
							{user?.first_name} {user?.last_name}
						</h3>
					</div>
					<div className="flex flex-col gap-1 mt-4 items-center">
						<h4 className="text-gray font-semibold text-sm sm:text-xs numeric">
							{phoneFormatter(user?.phone)}
						</h4>
						<h4 className="text-foreground_1 font-semibold text-sm sm:text-xs numeric">
							{user?.email}
						</h4>
					</div>
				</div>

				<div className="flex flex-col gap-3 items-center w-full mt-5 sm:mt-3 mb-2">
					<TariffCard isActive={isCardActive} data={user?.card} shouldNavigate />
				</div>

				<AvatarUpdating />

				<Link
					href={PAGES.UPDATE_PROFILE}
					className="
            bg-yellow text-white rounded-2xl text-base sm:text-sm font-semibold 
            w-full mt-auto p-3 sm:p-2 
            text-center flex items-center gap-2 justify-center sm:mt-3
          "
				>
					<SlPencil />
					Управление
				</Link>
			</div>
		</Translate>
	);
};

export default UserCard;
