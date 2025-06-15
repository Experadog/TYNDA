'use client';

import { useViewModel } from '@/i18n/getTranslate';
import { Link } from '@/i18n/routing';
import { formatDate } from '@/lib';
import type { Card } from '@business-entities';
import { type CSSProperties, type FC, useState } from 'react';
import './tariff-card.css';

interface IProps {
	isActive: boolean;
	data?: Card;
	shouldNavigate?: boolean;
	href?: string;
	style?: CSSProperties;
	disableAnimation?: boolean;
}

const TariffCard: FC<IProps> = ({
	isActive,
	data,
	shouldNavigate = false,
	href,
	style,
	disableAnimation = false,
}) => {
	const [rotate, setRotate] = useState({ x: 0, y: 0 });

	const { Tariff, Shared } = useViewModel(['Tariff', 'Shared']);
	const { your_tariff, not_active } = Tariff;
	const { card_types } = Shared;

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
		const x = ((e.clientX - left) / width - 0.5) * 60;
		const y = ((e.clientY - top) / height - 0.5) * -60;
		setRotate({ x, y });
	};

	const backgroundImage = isActive
		? '/profile/active-tariff.webp'
		: '/profile/non-active-tariff.webp';

	return (
		<Link className="w-full" href={shouldNavigate && href ? href : '#'}>
			<div
				className="credit-card"
				style={{
					transform: disableAnimation
						? ''
						: `rotateY(${rotate.x}deg) rotateX(${rotate.y}deg)`,
					boxShadow: disableAnimation
						? ''
						: `${-rotate.x}px ${rotate.y}px 10px rgba(0, 0, 0, 0.1)`,
					backgroundImage: `url(${backgroundImage})`,
					...style,
				}}
				onMouseMove={handleMouseMove}
				onMouseLeave={() => setRotate({ x: 0, y: 0 })}
			>
				{isActive && data ? (
					<div className="card-content flex flex-col p-4 w-full h-full justify-between">
						<span className="text-white tracking-wider text-lg font-mono sm:text-xs">
							{your_tariff}
						</span>
						<div className="flex items-center justify-between">
							<span className="text-white uppercase text-lg  sm:text-xs">
								{card_types[data?.tariff.card_type]}
							</span>
							<span className="text-white text-md numeric sm:text-xs">
								{formatDate(data?.expire_date || '', { shortFormat: true })}
							</span>
						</div>
					</div>
				) : (
					<span className="text-sm font-mono absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 sm:text-xs">
						{not_active}
					</span>
				)}
				<div
					className="card-thickness"
					style={{ backgroundImage: `url(${backgroundImage})` }}
				/>
			</div>
		</Link>
	);
};

export default TariffCard;
