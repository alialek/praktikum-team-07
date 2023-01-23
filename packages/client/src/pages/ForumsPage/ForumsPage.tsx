import { useEffect } from 'react';

import { useAppDispatch } from '@/hooks';
import { ForumsPageCard } from '@/components/Forums';
import { PageWithBackButton } from '@/components/PageWithBackButton';
import { getForums } from '@/store/forum/forum.actions';

export const ForumsPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getForums());
  }, [dispatch]);

  return (
    <PageWithBackButton>
      <ForumsPageCard />
    </PageWithBackButton>
  );
};
