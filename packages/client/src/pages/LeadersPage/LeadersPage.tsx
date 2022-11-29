import { PageWithBackButton } from '@/components/PageWithBackButton';
import { LeaderBoard } from '@/components/LeaderBoard';

export const LeadersPage = () => {
  return (
    <PageWithBackButton>
      <LeaderBoard />
    </PageWithBackButton>
  );
};
