'use client';

import { useViewModel } from '@/i18n/getTranslate';
import { useUser } from '@/providers/user/user-provider';
import type { ClientHistoryResponseModel } from '@/services';
import { getClientHistory } from '@/services/profile/profileService';
import { loadFilesAction } from '@common';
import { type FC, type ReactNode, createContext, useContext, useState } from 'react';
import { useUpdateProfileUseCase } from '../update-profile/use-case/useUpdateProfileUseCase';

interface ProfileContextType {
	states: {
		clientHistory: ClientHistoryResponseModel['data'];
		isAvatarUpdating: boolean;
	};
	actions: {
		moveToNextClientHistory: () => Promise<void>;
		openAvatarUpdating: () => void;
		closeAvatarUpdating: () => void;
		onUpdateAvatar: (data: File[]) => Promise<void>;
	};
}

interface ContextProps {
	children: ReactNode;
	clientHistoryResponse: ClientHistoryResponseModel['data'];
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileContextProvider: FC<ContextProps> = ({ children, clientHistoryResponse }) => {
	const [clientHistory, setClientHistory] = useState(clientHistoryResponse);
	const [isAvatarUpdating, setIsAvatarUpdating] = useState(false);

	const { CommonToast, Toast } = useViewModel(['Toast', 'CommonToast']);

	const { user } = useUser();

	const {
		actions: { onUpdateProfile },
	} = useUpdateProfileUseCase();

	const openAvatarUpdating = () => setIsAvatarUpdating(true);
	const closeAvatarUpdating = () => setIsAvatarUpdating(false);

	const onUpdateAvatar = async (data: File[]) => {
		const res = await loadFilesAction({
			data,
			toastMessage: Toast.LoadFile,
			validationMessage: CommonToast.too_large_image,
		});

		onUpdateProfile({
			avatar: res[0],
			first_name: user?.first_name,
			last_name: user?.last_name,
		});
	};

	const moveToNextClientHistory = async () => {
		const nextPage = clientHistory.page + 1;

		if (clientHistory.items.length === clientHistory.total) return;

		const nextPageData = await getClientHistory({ page: nextPage.toString() });

		setClientHistory((prevState) => ({
			...prevState,
			data: {
				...prevState,
				page: nextPage,
				items: [...prevState.items, ...nextPageData.data.items],
			},
		}));
	};

	return (
		<ProfileContext.Provider
			value={{
				actions: {
					moveToNextClientHistory,
					closeAvatarUpdating,
					openAvatarUpdating,
					onUpdateAvatar,
				},
				states: {
					clientHistory,
					isAvatarUpdating,
				},
			}}
		>
			{children}
		</ProfileContext.Provider>
	);
};

export const useProfileSettingsUseCase = (): ProfileContextType => {
	const context = useContext(ProfileContext);
	if (!context) {
		throw new Error('useProfileSettingsUseCase must be used within a RegisterProvider');
	}

	return context;
};
