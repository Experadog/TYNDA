'use client';

import { URL_LOCAL_ENTITIES, prepareErrorForServer } from '@/lib';
import { sendErrorToTelegram } from '@common';
import { Button, ImgMask } from '@components';
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
	}

	handleReset = async () => {
		await fetch(`/api${URL_LOCAL_ENTITIES.CLEAR_SESSION}`, {
			method: 'POST',
		})
			.then(async () => {
				if (typeof window !== 'undefined') {
					if ('caches' in window) {
						const cacheNames = await caches.keys();
						for (const cacheName of cacheNames) {
							await caches.delete(cacheName);
						}
					}
				}
			})
			.finally(() => window.location.reload());
	};
	render() {
		const { error, hasError } = this.state;

		const renderErrorLayout = (
			title: string,
			description: string,
			buttonText: string,
			buttonAction: () => void,
		) => (
			<div className="fixed inset-0 bg-background_6 flex items-center justify-center">
				<ImgMask />
				<div className="flex flex-col items-center gap-6 bg-background_2 rounded-md p-10 shadow-2xl max-w-lg w-full z-10 text-center">
					<AlertTriangle className="text-yellow-500 w-20 h-20" />
					<h1 className="text-2xl md:text-3xl font-semibold text-foreground_1">
						{title}
					</h1>
					<p className="text-sm md:text-base text-gray whitespace-pre-line leading-relaxed">
						{description}
					</p>
					<Button
						disableAnimation
						variant={'yellow'}
						onClick={buttonAction}
						size={'lg'}
						className="mt-6 px-6 py-5 bg-yellow text-white rounded-md font-medium shadow-md transition-colors"
					>
						{buttonText}
					</Button>
				</div>
			</div>
		);

		if (error?.message === '401') {
			return renderErrorLayout(
				'Сессия недействительна',
				'Ваша сессия была завершена — возможно, из-за входа с другого устройства.\nПожалуйста, выполните повторный вход для продолжения работы.',
				'Войти снова',
				this.handleReset,
			);
		}

		if (hasError) {
			return renderErrorLayout(
				'Произошла ошибка',
				'Во время выполнения запроса произошёл сбой.\nНаша команда уже уведомлена и работает над решением проблемы.',
				'Обновить страницу',
				this.handleReset,
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
