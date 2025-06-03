'use client';
import Image from 'next/image';
import { FC } from 'react';

const clubFeatures = [
    [
        {
            id: 0,
            divStyle: 'h-[362px]',
            text: 'Интерактивная туристическая карта – маршруты, достопримечательности, партнеры.',
            image: '/tariffs/tel1.webp',
            style: 'bg-yellow px-[66px] pt-[17px] items-end',
            imageStyle: 'w-[142px] h-[200px]',
        },
        {
            id: 1,
            text: 'Безопасность – SOS-кнопка, юрподдержка, страховка.',
            // без изображения
        },
    ],
    [
        {
            id: 2,
            divStyle: 'h-[292px] gap-0',
            text: 'Скидки и акции – отели, рестораны, аренда авто.',
            image: '/tariffs/card3d.webp',
            style: 'items-center justify-center',
            imageStyle: 'w-[202px] h-[202px]',
        },
        {
            id: 3,
            divStyle: 'h-[324px]',
            text: 'Удобство – все нужные сервисы в одном приложении.',
            image: '/tariffs/tel2.webp',
            style: 'bg-yellow px-[20px] pt-[20px] items-end',
            imageStyle: 'w-[236px] h-[201px]',
        },
    ],
    [
        {
            id: 4,
            divStyle: 'h-[324px]',
            text: 'Помощник туриста – туроператоры, гиды, трансферы.',
            image: '/tariffs/tel3.webp',
            style: 'bg-yellow px-[7px] items-center',
            imageStyle: 'w-[261px] h-[218px] rounded-[7px]',
        },
        {
            id: 5,
            divStyle: 'h-[292px]',
            text: 'Экономия – скидки у партнеров в 10 раз окупят подписку.',
            image: '/tariffs/moneyBag.webp',
            style: 'items-center justify-center',
            imageStyle: 'w-[185px] h-[185px]',
        },
    ],
    [
        {
            id: 6,
            divStyle: 'h-[282px]',
            text: 'Юридическая поддержка – помощь в сложных ситуациях.',
            image: '/tariffs/sheild.webp',
            style: 'items-center justify-center',
            imageStyle: 'w-[160px] h-[160px]',
        },
        {
            id: 7,
            divStyle: 'h-[284px]',
            text: 'Цифровой ассистент 24/7 – быстрые ответы на вопросы.',
            image: '/tariffs/tel4.webp',
            style: 'bg-yellow items-start justify-start',
            imageStyle: 'w-[255px] h-[170px]',
        },
    ],
];

interface IProps {
    touristClubViewModel: ViewModel['Tariffs']['touristClub']
}

const TouristClub: FC<IProps> = ({ touristClubViewModel }) => {
    return (
        <div className='mt-[108px] lg:mt-[40px] lg:px-5 max-w-[1340px] m-auto'>
            <div className='grid grid-cols-4 lg:grid-cols-1 gap-4 mt-[58px]'>
                {clubFeatures.map((column, colIndex) => (
                    <div
                        key={colIndex}
                        className='flex flex-col gap-6'
                    >
                        {column.map((item) => (
                            <div
                                key={item.id}
                                className={`bg-background_1 p-6 rounded-[15px] flex flex-col justify-center items-center gap-5 ${item.divStyle} 
                                ${[2, 5, 6].includes(item.id) ? 'flex-col-reverse' : 'flex-col'}`}
                            >
                                {item.image && (
                                    <div
                                        className={`w-[275px] h-[218px] flex relative rounded-[15px] ${item.style || ''}`}
                                    >
                                        <Image
                                            priority
                                            src={item.image}
                                            alt='icon'
                                            width={300}
                                            height={200}
                                            className={`${item.imageStyle}`}
                                        />
                                    </div>
                                )}
                                <p className='text-foreground_1 text-base font-semibold text-center'>
                                    {touristClubViewModel.text[item.id]}
                                </p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TouristClub;
