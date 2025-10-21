import { Outlet } from 'react-router-dom';

import PageWrapper from '@/app/PageWrapper';

export default function WithPageWrapper() {
  return (
    <PageWrapper>
      <Outlet />
    </PageWrapper>
  );
}
