'use client';

import { URL_LOCAL_ENTITIES } from '@/lib';
import { Button, ImgMask, LoadingSpinner } from '@components';
import { AlertTriangle } from 'lucide-react';
import React, { type ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

type State = {
	hasError: boolean;
	error: Error | null;
	isSessionExpired: boolean;
	timer: number;
};

const TIMEOUT = 5;

class ErrorBoundary extends React.Component<Props, State> {
	timerInterval: NodeJS.Timeout | null = null;

	constructor(props: Props) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			isSessionExpired: false,
			timer: 0,
		};
	}

	static getDerivedStateFromError(error: Error): State {
		return {
			hasError: true,
			error,
			isSessionExpired: error.message === '401',
			timer: TIMEOUT,
		};
	}

	componentDidUpdate(_: Props, prevState: State) {
		if (this.state.hasError && this.state.timer > 0 && prevState.timer !== this.state.timer) {
			this.startCountdown();
		}
	}

	componentWillUnmount() {
		if (this.timerInterval) {
			clearInterval(this.timerInterval);
		}
	}

	startCountdown() {
		if (this.timerInterval) return;

		this.timerInterval = setInterval(() => {
			this.setState(
				(prev) => ({ timer: prev.timer - 1 }),
				() => {
					if (this.state.timer <= 0) {
						if (this.timerInterval) {
							clearInterval(this.timerInterval);
						}
						this.timerInterval = null;
						this.handleReset();
					}
				},
			);
		}, 1000);
	}

	handleReset = async () => {
		try {
			await fetch(`/api${URL_LOCAL_ENTITIES.CLEAR_SESSION}`, {
				method: 'DELETE',
			});

			if (typeof window !== 'undefined' && 'caches' in window) {
				const cacheNames = await caches.keys();
				for (const name of cacheNames) {
					await caches.delete(name);
				}
			}
		} catch (error) {
			console.error('Ошибка при сбросе сессии:', error);
		} finally {
			window.location.reload();
		}
	};

	renderErrorLayout(
		title: string,
		description: string,
		buttonText: string,
		buttonAction: () => void,
	) {
		return (
			<div className="fixed inset-0 bg-background_6/80 backdrop-blur-sm flex items-center justify-center z-50">
				<ImgMask />
				<div className="relative z-10 w-full max-w-md rounded-2xl bg-background_4 p-8 shadow-2xl border border-yellow-400">
					<div className="flex flex-col items-center text-center gap-6">
						<AlertTriangle className="text-yellow w-16 h-16 animate-pulse" />
						<h2 className="text-2xl font-bold text-gray-900">{title}</h2>
						<p className="text-base text-gray whitespace-pre-line">{description}</p>

						<LoadingSpinner className="w-6 h-6 text-yellow animate-spin" />

						<Button
							disableAnimation
							variant="yellow"
							onClick={buttonAction}
							size="lg"
							className="mt-2 px-6 py-3 bg-yellow hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors"
						>
							{buttonText}
						</Button>
					</div>
				</div>
			</div>
		);
	}

	override render() {
		const { hasError, isSessionExpired, timer } = this.state;

		if (isSessionExpired) {
			return this.renderErrorLayout(
				'Обнаружен вход с другого устройства',
				`Сессия недействительна.\nВыход из аккаунта произойдёт автоматически через ${timer} секунд…`,
				'Выйти сейчас',
				this.handleReset,
			);
		}

		if (hasError) {
			return this.renderErrorLayout(
				'Произошла ошибка',
				`Во время выполнения запроса произошёл сбой.\nНаша команда уже уведомлена и работает над решением проблемы.\n   Страница обновиться автоматически через ${timer} секунд..`,
				'Обновить страницу',
				this.handleReset,
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
