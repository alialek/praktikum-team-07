import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Card,
  Divider,
  Grid,
  Box,
  Stack,
  TextField,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Add } from '@mui/icons-material';

import { THREAD_TEXT } from '@/сonstants/text';
import {
  TITLE_MESSAGE,
  TITLE_NICKNAME,
  ADD_BUTTON,
  MESSAGE_FIELD_LABEL,
} from '@/сonstants/threadPageText';
import { threadStyles } from './Styles';
import { Thread } from './Thread';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { CreateMessageModel } from '@/models/forum.model';
import { FormDialog } from '../FormDialog';
import { createMessageValidationSchema } from '@/utils/formValidation';
import { createMessage } from '@/store/forum/forum.actions';
import { showUserData } from '@/store/user/user.slice';

export const ThreadPageCard = () => {
  const dispatch = useAppDispatch();
  const { threadId } = useParams();

  const { profile } = useAppSelector(showUserData);
  const { thread, loading } = useAppSelector((state) => state.forum);
  const [open, setOpen] = useState(false);

  const handleSubmit = (message: CreateMessageModel) => {
    if (threadId && profile) {
      dispatch(
        createMessage({
          ...message,
          threadId: Number(threadId),
          nickname: profile.login,
        }),
      ).then(() => {
        setOpen(false);
      });
    }
  };

  return (
    <Card sx={threadStyles.cardWrapper}>
      <Box sx={threadStyles.mainTitleWrapper}>
        <Typography variant="h1" color="primary" sx={threadStyles.mainTitle}>
          {THREAD_TEXT}
        </Typography>
        <Tooltip title={ADD_BUTTON} placement="left-end">
          <IconButton onClick={() => setOpen(true)}>
            <Add />
          </IconButton>
        </Tooltip>
      </Box>
      <Typography variant="h5" color="primary" align="center" sx={{ mb: 3 }}>
        {thread?.name}
      </Typography>
      <Grid container padding="0 0 16px 0">
        <Grid item xs={1} />
        <Grid item xs={2}>
          <Typography component="div" sx={threadStyles.title}>
            {TITLE_NICKNAME}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography component="div" sx={threadStyles.title}>
            {TITLE_MESSAGE}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Box sx={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
        <Thread items={thread?.messages || []} loading={loading} />
      </Box>
      <FormDialog<CreateMessageModel>
        title={ADD_BUTTON}
        open={open}
        onClose={setOpen}
        onSubmit={handleSubmit}
        validationSchema={createMessageValidationSchema}
      >
        {(register, formState) => {
          return (
            <Stack direction="column" spacing={2}>
              <TextField
                type="text"
                {...register('message')}
                id="name"
                label={MESSAGE_FIELD_LABEL}
                autoFocus
                multiline
                maxRows={6}
                error={!!formState.errors?.message}
                helperText={formState.errors.message?.message || ' '}
              />
            </Stack>
          );
        }}
      </FormDialog>
    </Card>
  );
};
