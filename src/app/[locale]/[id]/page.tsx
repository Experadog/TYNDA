import { getEstablishmentAllclient, getEstablishmentDetail } from '@/services/establishment/establishmentService';
import DetailEnterpriseView from './detail-enterprise/detail-enterprise-view';

type PageProps = {
  params: { id: string };
}

const DetailEnterprise = async ({ params }: PageProps) => {
  const establishmentAllclient = await getEstablishmentAllclient({});
  const detailData = await getEstablishmentDetail(params.id);

  return (
    <DetailEnterpriseView
      establishment={detailData?.data || []}
      allEstablishments={establishmentAllclient?.data?.items || []}
    />
  );
};

export default DetailEnterprise;
