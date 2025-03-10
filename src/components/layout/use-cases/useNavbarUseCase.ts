'use client';
import { useViewModel } from '@/i18n/getTranslate';
import { usePathname, useRouter } from '@/i18n/routing';
import { PAGES } from '@/lib';
import { useUser } from '@/providers/user/user-provider';
import { useEffect, useMemo, useState } from 'react';

export function useNavbarUseCase() {
    const viewModel = useViewModel(['Layout']);
    const [isScrolled, setIsScrolled] = useState(false);
    const { user } = useUser();
    const router = useRouter();
    const pathname = usePathname();

    const navigateToAuthOrProfile = () => {
        router.push(user ? PAGES.PROFILE : PAGES.LOGIN);
    };

    const shouldHighlightLink = useMemo(() => (path: string) => path === pathname, [pathname]);
    const shouldHighlightBtn = useMemo(() => pathname.startsWith('/auth') || pathname.startsWith(PAGES.PROFILE), [pathname]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return { viewModel, isScrolled, user, navigateToAuthOrProfile, shouldHighlightLink, shouldHighlightBtn };
}
