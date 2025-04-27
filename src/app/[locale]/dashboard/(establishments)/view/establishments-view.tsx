import { FC } from 'react';
import EmptyView from '../_components/empty-view';

interface IProps {}

const EstablishmentsView: FC<IProps> = ({}) => {
    return (
        <div className='w-full h-full'>
            <EmptyView />
        </div>
    );
};

export default EstablishmentsView;
