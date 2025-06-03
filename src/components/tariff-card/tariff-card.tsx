'use client';

import { type FC, useState } from 'react';
import './tariff-card.css';

interface IProps {
	isActive: boolean;
}

const TariffCard: FC<IProps> = ({ isActive }) => {
	const [rotate, setRotate] = useState({ x: 0, y: 0 });

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
		<div
			className="credit-card"
			style={{
				transform: `rotateY(${rotate.x}deg) rotateX(${rotate.y}deg)`,
				boxShadow: `${-rotate.x}px ${rotate.y}px 10px rgba(0, 0, 0, 0.1)`,
				backgroundImage: `url(${backgroundImage})`,
			}}
			onMouseMove={handleMouseMove}
			onMouseLeave={() => setRotate({ x: 0, y: 0 })}
		>
			<div className="card-content flex flex-col p-4 w-full h-full justify-between">
				<span className="text-white opacity-50 font-semibold text-lg">Ваш тариф:</span>
				<div className="flex items-center justify-between">
					<span className="text-white uppercase font-semibold text-lg">
						Touristic plan
					</span>
					<span className="text-white uppercase font-extrabold text-xl numeric">
						05/08
					</span>
				</div>
			</div>
			<div className="card-thickness" style={{ backgroundImage: `url(${backgroundImage})` }}>
				123
			</div>
		</div>
	);
};

export default TariffCard;
