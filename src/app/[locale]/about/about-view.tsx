'use client';
import UnderDevelopment from '@/components/underDevelopment/UnderDevelopment';
import { useViewModel } from '@/i18n/getTranslate';
import type { FC } from 'react';


interface IProps { }

const AboutView: FC<IProps> = ({ }) => {
  const viewModel = useViewModel(['About']);

  return (
    <div>
      <UnderDevelopment title={viewModel.title} />
    </div>
  );
};

export default AboutView;
