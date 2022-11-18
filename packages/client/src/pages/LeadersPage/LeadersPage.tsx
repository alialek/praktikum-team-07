import { PageWithBackButton } from '@/components/PageWithBackButton';
import { Leaderboard } from './components/Leaderboard';

export const LeadersPage = () => {
  return (
    <PageWithBackButton>
      <Leaderboard />
    </PageWithBackButton>
  );
};
