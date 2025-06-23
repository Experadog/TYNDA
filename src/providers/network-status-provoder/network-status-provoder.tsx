'use client';

import type React from 'react';
import { type ReactNode, useEffect, useState } from 'react';

interface NetworkStatusProviderProps {
	children: ReactNode;
}

const NetworkStatusProvider: React.FC<NetworkStatusProviderProps> = ({ children }) => {
	const [isOnline, setIsOnline] = useState<boolean>(
		typeof navigator !== 'undefined' ? navigator.onLine : true,
	);

	useEffect(() => {
		const goOnline = () => setIsOnline(true);
		const goOffline = () => setIsOnline(false);

		window.addEventListener('online', goOnline);
		window.addEventListener('offline', goOffline);

		return () => {
			window.removeEventListener('online', goOnline);
			window.removeEventListener('offline', goOffline);
		};
	}, []);

	if (!isOnline) {
		return (
			<div
				style={{
					height: '100vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					background: '#fff3f3',
					color: '#c00',
					fontSize: 24,
					fontWeight: 'bold',
					textAlign: 'center',
					padding: 20,
				}}
			>
				Вы не подключены к интернету.
				<br />
				Пожалуйста, проверьте соединение и попробуйте снова.
			</div>
		);
	}

	return <>{children}</>;
};

export default NetworkStatusProvider;
