'use client';

import UnderDevelopment from '@/components/underDevelopment/UnderDevelopment';
import { useViewModel } from '@/i18n/getTranslate';
import { FC } from 'react';

interface IProps { }

const BenefitsMapView: FC<IProps> = ({ }) => {
    const viewModel = useViewModel(['BenefitsMap']);

    return (
        <div>
            <UnderDevelopment title={viewModel.title} />
        </div>
    )

};

export default BenefitsMapView;
