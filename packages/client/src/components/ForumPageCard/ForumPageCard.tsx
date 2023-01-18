import { Typography, Card, Divider, Grid, Box } from '@mui/material';
import { Forum } from '@/components/Forum';
import { FORUM_TEXT } from '@/сonstants/text';
import { TITLE_FORUMS, TITLE_ANSWER, TITLE_THREADS } from '@/сonstants/forumPageText';
import { forumsList } from './utils';
import { BackButton } from '../BackButton';
import { forumStyles } from './Styles';

export const ForumPageCard = () => {
  return (
    <Box>
      <Grid sx={forumStyles.boxWrapper}>
        <Box sx={{ maxWidth: '1094px', width: '100%' }}>
          <Grid container paddingBottom="50px">
            <BackButton color="secondary" />
          </Grid>
          <Card sx={forumStyles.cardWrapper}>
            <Typography variant="h1" color="primary" sx={forumStyles.mainTitle}>
              {FORUM_TEXT}
            </Typography>
            <Grid container spacing={2} padding="0 0 16px 0">
              <Grid item md={6}>
                <Typography component="div" sx={forumStyles.title} align="left">
                  {TITLE_FORUMS}
                </Typography>
              </Grid>
              <Grid item md={3}>
                <Typography component="div" sx={forumStyles.title} align="right">
                  {TITLE_THREADS}
                </Typography>
              </Grid>
              <Grid item md={3}>
                <Typography component="div" sx={forumStyles.title} align="right">
                  {TITLE_ANSWER}
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Forum items={forumsList} />
          </Card>
        </Box>
      </Grid>
    </Box>
  );
};
