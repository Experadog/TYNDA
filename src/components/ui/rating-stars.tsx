import clsx from 'clsx';
import { Star } from 'lucide-react';
import { FC } from 'react';

interface IProps {
    rating: number;
    size?: 'small' | 'large' | 'default';
}

const sizeClasses = {
    small: 'w-4 h-4',
    default: 'w-5 h-5',
    large: 'w-7 h-7',
};

const getFillPercentage = (value: number) => {
    if (value >= 0.7) return 75;
    if (value >= 0.4) return 50;
    if (value >= 0.1) return 25;
    return 0;
};

const RatingStars: FC<IProps> = ({ rating, size = 'default' }) => {
    return (
        <div className='flex gap-1'>
            {[...Array(5)].map((_, i) => {
                const rawFill = rating - i;
                const fillPercentage = rawFill >= 1 ? 100 : getFillPercentage(rawFill);

                return (
                    <div
                        key={i}
                        className='relative'
                    >
                        <Star className={clsx(sizeClasses[size], 'fill-black stroke-none')} />
                        {fillPercentage > 0 && (
                            <div
                                className='absolute top-0 left-0 overflow-hidden'
                                style={{ width: `${fillPercentage}%` }}
                            >
                                <Star className={clsx(sizeClasses[size], 'fill-yellow stroke-yellow')} />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default RatingStars;
