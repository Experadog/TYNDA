'use client';

import { useViewModel } from '@/i18n/getTranslate';
import { FC } from 'react';

interface IProps {}

const BenefitsMapView: FC<IProps> = ({}) => {
    const viewModel = useViewModel(['BenefitsMap']);

    return <div>{viewModel.title}</div>;
};

export default BenefitsMapView;
