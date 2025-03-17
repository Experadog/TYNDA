'use client';
import { useViewModel } from '@/i18n/getTranslate';
import { usePathname, useRouter } from '@/i18n/routing';
import { PAGES } from '@/lib';
import { useUser } from '@/providers/user/user-provider';
import { useMemo } from 'react';

export function useNavbarUseCase() {
    const viewModel = useViewModel(['Layout']);
    const { user } = useUser();
    const router = useRouter();
    const pathname = usePathname();

    const navigateToAuthOrProfile = () => {
        router.push(user ? PAGES.PROFILE : PAGES.LOGIN);
    };

    const shouldHighlightLink = useMemo(() => (path: string) => path === pathname, [pathname]);
    const shouldHighlightBtn = useMemo(() => pathname.startsWith('/auth') || pathname.startsWith(PAGES.PROFILE), [pathname]);

    return { viewModel, user, navigateToAuthOrProfile, shouldHighlightLink, shouldHighlightBtn };
}
