'use client';
import { useViewModel } from '@/i18n/getTranslate';
import { usePathname, useRouter } from '@/i18n/routing';
import { PAGES } from '@/lib';
import { useUser } from '@/providers/user/user-provider';
import { UserRole } from '@business-entities';
import { useMemo, useRef } from 'react';

export function useNavbarUseCase(onClose?: (state: boolean) => void) {
	const viewModel = useViewModel(['Layout']);
	const { user } = useUser();
	const router = useRouter();
	const pathname = usePathname();

	const navigateToAuthOrProfile = () => {
		if (!user) {
			router.push(PAGES.LOGIN);
			return;
		}

		if (user.is_superuser || user.role === UserRole.ESTABLISHER) {
			router.push(PAGES.DASHBOARD);
		} else if (user.role === UserRole.CLIENT) {
			router.push(PAGES.PROFILE);
		} else {
			router.push(PAGES.LOGIN);
		}
	};

	const shouldHighlightLink = useMemo(() => (path: string) => path === pathname, [pathname]);
	const shouldHighlightBtn = useMemo(
		() => pathname.startsWith('/auth') || pathname.startsWith(PAGES.PROFILE),
		[pathname],
	);

	const startXRef = useRef<number | null>(null);
	const startYRef = useRef<number | null>(null);

	const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
		startXRef.current = e.touches[0].clientX;
		startYRef.current = e.touches[0].clientY;
	};

	const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
		if (startXRef.current === null || startYRef.current === null) return;

		const endX = e.changedTouches[0].clientX;
		const endY = e.changedTouches[0].clientY;

		const deltaX = endX - startXRef.current;
		const deltaY = endY - startYRef.current;

		if (Math.abs(deltaY) > Math.abs(deltaX)) return;

		if (deltaX > 50) {
			onClose?.(false);
		}

		startXRef.current = null;
		startYRef.current = null;
	};

	return {
		viewModel,
		user,
		navigateToAuthOrProfile,
		shouldHighlightLink,
		shouldHighlightBtn,
		handleTouchStart,
		handleTouchEnd,
	};
}
