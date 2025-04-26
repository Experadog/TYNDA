import { Button } from '@components';
import { FC } from 'react';
import { BiSolidErrorCircle } from 'react-icons/bi';

interface IProps {}

const EmptyView: FC<IProps> = ({}) => {
    return (
        <div className='flex items-center justify-center w-full h-full flex-col gap-3'>
            <BiSolidErrorCircle
                size={50}
                className='text-foreground_1'
            />
            <p className='text-3xl text-foreground_2 font-semibold '>Предприятий не обнаружено</p>
            <p className='text-sm text-foreground_3 font-normal '>
                Создайте первое предприятие прямо сейчас!
            </p>

            <Button
                variant={'yellow'}
                className=''
                size={'lg'}
            >
                Создать!
            </Button>
        </div>
    );
};

export default EmptyView;
