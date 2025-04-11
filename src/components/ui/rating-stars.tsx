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

const RatingStars: FC<IProps> = ({ rating, size = 'default' }) => {
    const fullStars = Math.floor(rating);
    const fractionalStar = rating - fullStars;

    return (
        <div className='flex gap-1'>
            {[...Array(5)].map((_, i) => {
                const isFullStar = i < fullStars;
                const isPartialStar = i === fullStars && fractionalStar > 0;

                return (
                    <div
                        key={i}
                        className='relative'
                    >
                        <Star className={clsx(sizeClasses[size], 'fill-black stroke-none')} />

                        {isPartialStar && (
                            <div
                                className='absolute top-0 left-0 w-full overflow-hidden '
                                style={{
                                    width: `${fractionalStar * 100}%`,
                                    height: '100%',
                                }}
                            >
                                <Star className={clsx(sizeClasses[size], 'fill-yellow stroke-none')} />
                            </div>
                        )}

                        {/* Полностью залитая желтая звезда */}
                        {isFullStar && <Star className={clsx(sizeClasses[size], 'fill-yellow stroke-none absolute top-0 left-0 w-full overflow-hidden ')} />}
                    </div>
                );
            })}
        </div>
    );
};

export default RatingStars;
