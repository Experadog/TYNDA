'use client';
import { useRouter } from '@/i18n/routing';
import { FC, ReactNode } from 'react';
import List from '../_components/chat-list/list';

interface IProps {
    children: ReactNode;
}

const ChatLayoutView: FC<IProps> = ({ children }) => {
    const router = useRouter();

    return (
        <div className='flex flex-col gap-4 h-full min-h-[800px]'>
            <div className='p-5 rounded-3xl shadow-md bg-background_1'>
                <p className='text-lg'>
                    Сообщения{' '}
                    <span className='bg-[#DAF0FF] text-black rounded-2xl text-sm px-3 py-2 numeric'>
                        12
                    </span>
                </p>
            </div>
            <div className='flex gap-4 h-full'>
                <div className='flex-[1] p-5 rounded-3xl shadow-md bg-background_1'>
                    <List />
                </div>
                <div className='flex-[2.5] p-5 rounded-3xl shadow-md bg-background_1'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ChatLayoutView;
