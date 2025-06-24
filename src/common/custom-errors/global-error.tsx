'use client';

import { COOKIES } from '@/lib';
import { Button, ImgMask, LoadingSpinner } from '@components';
import { AlertTriangle } from 'lucide-react';
import React, { type ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

type State = {
	hasError: boolean;
	error: Error | null;
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
			timer: TIMEOUT,
		};
	}

	static getDerivedStateFromError(error: Error): Partial<State> {
		return {
			hasError: true,
			error,
			timer: TIMEOUT,
		};
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('Caught error:', error, errorInfo);
		this.startCountdown();
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

	clearCookies(cookies: string[]) {
		const expireDate = 'Thu, 01 Jan 1970 00:00:00 GMT';
		for (const cookieName of cookies) {
			document.cookie = `${cookieName}=; path=/; expires=${expireDate};`;
		}
	}

	handleReset = () => {
		this.clearCookies([
			COOKIES.SESSION,
			COOKIES.USER_SETTINGS,
			COOKIES.LAST_PROFILE_RETRIEVAL,
			COOKIES.LAST_REVALIDATE_KEY,
			COOKIES.STAFF_ESTABLISHMENT,
		]);
		window.location.reload();
		window.location.href = '/';
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
				<div className="relative z-10 w-full max-w-md rounded-2xl bg-background_4 p-8 shadow-2xl border border-yellow">
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
							className="mt-2 px-6 py-3 bg-yellow  text-white rounded-lg font-medium transition-colors"
						>
							{buttonText}
						</Button>
					</div>
				</div>
			</div>
		);
	}

	override render() {
		const { hasError, timer } = this.state;

		if (process.env.NODE_ENV === 'development') {
			return this.props.children;
		}

		if (hasError) {
			return this.renderErrorLayout(
				'Произошла ошибка',
				`Во время выполнения запроса произошёл сбой.\nНаша команда уже уведомлена и работает над решением проблемы.\nСтраница обновится автоматически через ${timer} секунд…`,
				'Обновить страницу',
				this.handleReset,
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
