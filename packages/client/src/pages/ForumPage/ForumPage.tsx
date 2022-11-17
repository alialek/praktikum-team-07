import { Typography, Card, Divider, Grid } from '@mui/material';
import { Forum } from '../../components/Forum/Forum';
import { BackButton } from '@/components/BackButton';
import { FORUM_TEXT } from '@/сonstants/text';
import { TITLE_FORUMS, TITLE_ANSWER, TITLE_THREADS } from '@/сonstants/forumPageText';

export const ForumPage = () => {
  const forumsList = [
    { title: '123', description: 'sun shine reggae', threads: 100, total_answer: 10 },
    { title: '231', description: 'sun shine reggae', threads: 101, total_answer: 11 },
    { title: '321', description: 'sun shine reggae', threads: 100, total_answer: 10 },
  ];
  return (
    <Grid container spacing={0} direction="column" style={{ minHeight: '100vh' }}>
      <Grid container paddingBottom="50px">
        <BackButton color="secondary" />
      </Grid>
      <Card
        sx={{
          maxWidth: '1094px',
          padding: '30px 50px',
          background: '#FAFAFA',
          borderRadius: '10px',
          width: '100%',
        }}
      >
        <Typography
          variant="h1"
          fontSize={40}
          padding="0 0 56px 0"
          align="left"
          color="primary"
        >
          {FORUM_TEXT}
        </Typography>
        <Grid container spacing={2} padding="0 0 16px 0">
          <Grid item md={6}>
            <Typography fontSize={20} fontWeight={'700'} align="left" component="div">
              {TITLE_FORUMS}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Typography fontSize={20} fontWeight={'700'} align="right" component="div">
              {TITLE_THREADS}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Typography fontSize={20} fontWeight={'700'} align="right" component="div">
              {TITLE_ANSWER}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Forum items={forumsList} />
      </Card>
    </Grid>
  );
};
