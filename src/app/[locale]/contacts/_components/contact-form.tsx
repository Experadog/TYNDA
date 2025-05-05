'use client';
import { Button } from '@components';
import { FC } from 'react';

interface IProps {}

const ContactForm: FC<IProps> = ({}) => {
    return (
        <div className='my-[100px] lg:my-[60px] flex flex-col gap-[60px]'>
            <div className='flex lg:flex-wrap items-center gap-8'>
                <h3 className='text-4xl lg:text-2xl font-medium'>
                    Свяжитесь с нами – мы всегда готовы помочь и ответить на ваши вопросы!
                </h3>
                <p className='opacity-70 text-base font-normal max-w-[357px]'>
                    Вы можете задать вопросы, уточнить детали маршрутов и оформить бронирование
                    удобным способом.
                </p>
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-1'>
                <form className='flex flex-col items-start w-full gap-[14px]'>
                    <div
                        style={{ borderBottom: '1.5px solid rgba(14, 14, 14, 0.20)' }}
                        className='flex flex-col gap-[10px] w-full pb-[10px]'
                    >
                        <label className='text-lg w-full'>Ваше имя</label>
                        <input
                            name='name'
                            type='text'
                            placeholder='Ваше имя'
                            required
                            autoComplete='name'
                            className='w-full outline-none numeric bg-inherit'
                        />
                    </div>
                    <div
                        style={{ borderBottom: '1.5px solid rgba(14, 14, 14, 0.20)' }}
                        className='flex flex-col gap-[10px] w-full pb-[10px]'
                    >
                        <label className='text-lg w-full'>Ваш номер телефона</label>
                        <input
                            name='phone'
                            type='tel'
                            placeholder='Введите номер телефона'
                            required
                            autoComplete='tel'
                            className='w-full outline-none numeric bg-inherit'
                        />
                    </div>
                    <div
                        style={{ borderBottom: '1.5px solid rgba(14, 14, 14, 0.20)' }}
                        className='flex flex-col gap-[10px] w-full pb-[10px]'
                    >
                        <label className='text-lg w-full'>Ваш e-mail</label>
                        <input
                            name='email'
                            type='email'
                            placeholder='Ваш e-mail'
                            required
                            autoComplete='email'
                            className='w-full outline-none numeric bg-inherit'
                        />
                    </div>
                    <div
                        style={{ borderBottom: '1.5px solid rgba(14, 14, 14, 0.20)' }}
                        className='flex flex-col gap-[10px] w-full pb-[10px]'
                    >
                        <label className='text-lg w-full'>Сообщение</label>
                        <textarea
                            name='message'
                            required
                            autoComplete='off'
                            className='w-full outline-none min-h-[20px] numeric bg-inherit'
                            placeholder='Напишите сообщение'
                        ></textarea>
                    </div>
                    <Button
                        type='submit'
                        variant={'yellow'}
                        className='my-8 w-full rounded-3xl p-6'
                    >
                        Отправить
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
