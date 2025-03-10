import { useViewModel } from '@/i18n/getTranslate';
import { useRouter } from '@/i18n/routing';
import { PAGES } from '@/lib';
import { useUser } from '@/providers/user/user-provider';
import { logout } from '@/services';
import { CommonResponse, createAction, useAsyncAction } from '@common';

export function useProfileUseCase() {
    const viewModel = useViewModel(['Toast']);

    const router = useRouter();
    const { setUser, user } = useUser();

    const { execute } = useAsyncAction<CommonResponse<null>, [void]>({
        messages: viewModel.Logout,
    });

    const logoutAction = createAction({
        requestAction: logout,
        onSuccess: () => {
            router.push(PAGES.LOGIN);
            setUser(null);
        },
    });

    const handleLogout = async () => {
        await execute(logoutAction);
    };

    return { handleLogout, user };
}
