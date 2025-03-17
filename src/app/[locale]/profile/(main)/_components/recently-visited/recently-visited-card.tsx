import Image from 'next/image';
import { FC } from 'react';

interface IProps {
    image: string;
    title: string;
    category: string;
    location: string;
    rating: number;
    review_count: number;
}

const RecentlyVisitedCard: FC<IProps> = ({ image, title }) => {
    return (
        <div className='flex flex-col max-w-[368px] w-full shadow-lg'>
            <Image
                src={image}
                alt={title}
                className='w-full h-'
            />
        </div>
    );
};

export default RecentlyVisitedCard;
