import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '@/hooks';
import { ForumPageCard } from '@/components/Forum';
import { PageWithBackButton } from '@/components/PageWithBackButton';
import { getForumById } from '@/store/forum/forum.actions';

export const ForumPage = () => {
  const { forumId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (forumId) {
      dispatch(getForumById(Number(forumId)));
    }
  }, [dispatch, forumId]);

  return (
    <PageWithBackButton>
      <ForumPageCard />
    </PageWithBackButton>
  );
};
