import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '@/hooks';
import { ThreadPageCard } from '@/components/Thread';
import { PageWithBackButton } from '@/components/PageWithBackButton';
import { getThreadById } from '@/store/forum/forum.actions';

export const ThreadPage = () => {
  const { threadId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (threadId) {
      dispatch(getThreadById(Number(threadId)));
    }
  }, [dispatch, threadId]);

  return (
    <PageWithBackButton>
      <ThreadPageCard />
    </PageWithBackButton>
  );
};
