import { getEstablishmentAllclient } from '@/services/establishment/establishmentService';
import { FC } from 'react';
import AllEnterprisesView from './all-enterprises-view';

interface IProps {}

const AllEnterprises: FC<IProps> = async ({}) => {
    const establishmentAllclient = await getEstablishmentAllclient({})
    return <AllEnterprisesView establishments={establishmentAllclient?.data?.items || []} />;
};

export default AllEnterprises;
