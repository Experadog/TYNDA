'use client';
import Image from 'next/image';
import { FC } from 'react';

const clubFeatures = [
    [
        {
            divStyle: 'h-[362px]',
            text: 'Интерактивная туристическая карта – маршруты, достопримечательности, партнеры.',
            image: '/tariffs/tel1.webp',
            style: 'bg-yellow px-[66px] pt-[17px] items-end',
            imageStyle: 'w-[142px] h-[200px]',
        },
        {
            text: 'Безопасность – SOS-кнопка, юрподдержка, страховка.',
            // без изображения
        },
    ],
    [
        {
            divStyle: 'h-[292px]',
            text: 'Скидки и акции – отели, рестораны, аренда авто.',
            image: '/tariffs/card3d.webp',
            style: 'items-center justify-center',
            imageStyle: 'w-[202px] h-[202px]',
        },
        {
            divStyle: 'h-[324px]',
            text: 'Удобство – все нужные сервисы в одном приложении.',
            image: '/tariffs/tel2.webp',
            style: 'bg-yellow px-[20px] pt-[20px] items-end',
            imageStyle: 'w-[236px] h-[201px]',
        },
    ],
    [
        {
            divStyle: 'h-[324px]',
            text: 'Помощник туриста – туроператоры, гиды, трансферы.',
            image: '/tariffs/tel3.webp',
            style: 'bg-yellow px-[7px] items-center',
            imageStyle: 'w-[261px] h-[218px] rounded-[7px]',
        },
        {
            divStyle: 'h-[292px]',
            text: 'Экономия – скидки у партнеров в 10 раз окупят подписку.',
            image: '/tariffs/moneyBag.webp',
            style: 'items-center justify-center',
            imageStyle: 'w-[185px] h-[185px]',
        },
    ],
    [
        {
            divStyle: 'h-[282px]',
            text: 'Юридическая поддержка – помощь в сложных ситуациях.',
            image: '/tariffs/sheild.webp',
            style: 'items-center justify-center',
            imageStyle: 'w-[160px] h-[160px]',
        },
        {
            divStyle: 'h-[284px]',
            text: 'Цифровой ассистент 24/7 – быстрые ответы на вопросы.',
            image: '/tariffs/tel4.webp',
            style: 'bg-yellow items-start justify-start',
            imageStyle: 'w-[255px] h-[170px]',
        },
    ],
];

interface IProps {}

const TouristClub: FC<IProps> = ({}) => {
    return (
        <div className='mt-[108px] lg:mt-[40px] lg:px-5 max-w-[1340px] m-auto'>
            <div className='flex flex-col items-center gap-10'>
                <h3 className='text-5xl lg:text-2xl font-semibold text-center'>
                    Что даёт туристическая клубная карта?
                </h3>
                <p className='text-lg lg:text-base font-semibold text-center'>
                    Что входит в подписку (10$ на 15 дней)
                </p>
            </div>
            <div className='grid grid-cols-4 lg:grid-cols-1 gap-4 mt-[40px]'>
                {clubFeatures.map((column, colIndex) => (
                    <div
                        key={colIndex}
                        className='flex flex-col gap-6'
                    >
                        {column.map((item, rowIndex) => (
                            <div
                                key={rowIndex}
                                className={`bg-background_4 p-6 rounded-[15px] flex flex-col justify-center items-center gap-5 ${item.divStyle}`}
                            >
                                {item.image && (
                                    <div
                                        className={`w-[275px] h-[218px] flex relative rounded-[15px] ${item.style || ''}`}
                                    >
                                        <Image
                                            src={item.image}
                                            alt='icon'
                                            width={300}
                                            height={200}
                                            className={`${item.imageStyle}`}
                                        />
                                    </div>
                                )}
                                <p className='text-foreground_1 text-base font-semibold text-center'>
                                    {item.text}
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
