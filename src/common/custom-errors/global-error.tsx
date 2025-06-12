'use client';

import { prepareErrorForServer } from '@/lib';
import { ClearSessionError, sendErrorToTelegram } from '@common';
import { ImgMask, LoadingSpinner } from '@components';
import { AlertTriangle } from 'lucide-react';
import React, { type ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

type State = {
	hasError: boolean;
	error: Error | null;
};

class ErrorBoundary extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	async componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		if (process.env.NODE_ENV === 'production') {
			const serializedError = prepareErrorForServer(error, errorInfo);
			await sendErrorToTelegram(serializedError);
		} else {
			console.error('Caught error:', error, errorInfo);
		}

		if (error?.message === new ClearSessionError().getMessage()) {
			await this.handleReset();
			return;
		}
	}

	handleReset = async () => {
		if (typeof window !== 'undefined') {
			const cookies = document.cookie.split(';');
			for (const cookie of cookies) {
				const [rawName] = cookie.split('=');
				const name = rawName.trim();

				document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
			}

			if ('caches' in window) {
				const cacheNames = await caches.keys();
				for (const cacheName of cacheNames) {
					await caches.delete(cacheName);
				}
			}

			window.location.reload();
		}
	};

	render() {
		if (this.state.error?.message === 'Session needs to be cleared') {
			return (
				<div className="fixed inset-0 flex flex-col gap-2 items-center justify-center bg-background_6 text-foreground_1 p-4">
					<h1 className="text-3xl font-bold text-center">Tynda KG</h1>

					<LoadingSpinner className="text-yellow size-10" />
				</div>
			);
		}

		if (this.state.hasError) {
			return (
				<div
					className="fixed inset-0 flex items-center justify-center"
					style={{ backgroundImage: `url('/home/herobg.webp')` }}
				>
					<ImgMask />
					<div className="flex flex-col items-center gap-6 bg-background_2 border border-light_gray rounded-2xl p-10 shadow-2xl max-w-md w-full z-10">
						<AlertTriangle className="text-foreground_1 w-20 h-20" />
						<h1 className="text-3xl font-bold text-center">Что-то пошло не так</h1>
						<p className="text-base text-center text-gray">
							К сожалению, произошла внутренняя ошибка приложения. <br /> Мы уже
							работаем над решением.
						</p>
						<button
							type="button"
							onClick={this.handleReset}
							className="mt-4 px-8 py-3 bg-yellow text-white rounded-xl font-semibold shadow-lg transition hover:brightness-90"
						>
							Перезапустить сайт
						</button>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
