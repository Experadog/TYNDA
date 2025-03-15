'use client';

import { FC, useState } from 'react';
import './tariff-card.css';

interface IProps {
    isActive: boolean;
    data: {};
}

const TariffCard: FC<IProps> = ({}) => {
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width - 0.5) * 60;
        const y = ((e.clientY - top) / height - 0.5) * -60;
        setRotate({ x, y });
    };

    return (
        <div
            className='credit-card'
            style={{
                transform: `rotateY(${rotate.x}deg) rotateX(${rotate.y}deg)`,
                boxShadow: `${-rotate.x}px ${rotate.y}px 10px rgba(0, 0, 0, 0.1)`,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setRotate({ x: 0, y: 0 })}
        >
            <div className='card-content'></div>
            <div className='card-thickness'></div>
        </div>
    );
};

export default TariffCard;
