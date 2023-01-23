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
  Tooltip,
  IconButton,
} from '@mui/material';
import { Add } from '@mui/icons-material';

import { FORUM_TEXT } from '@/сonstants/text';
import {
  TITLE_ANSWER,
  TITLE_THREADS,
  ADD_BUTTON,
  NAME_FIELD_LABEL,
  DESCRIPTION_FIELD_LABEL,
} from '@/сonstants/forumPageText';
import { forumStyles } from './Styles';
import { Forum } from './Forum';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { FormDialog } from '../FormDialog';
import { CreateThreadModel } from '@/models/forum.model';
import { createThread } from '@/store/forum/forum.actions';
import { createThreadValidationSchema } from '@/utils/formValidation';

export const ForumPageCard = () => {
  const dispatch = useAppDispatch();
  const { forumId } = useParams();

  const { forum, loading } = useAppSelector((state) => state.forum);
  const [open, setOpen] = useState(false);

  const handleSubmit = (thread: CreateThreadModel) => {
    if (forumId) {
      dispatch(createThread({ ...thread, forumId: Number(forumId) })).then(() => {
        setOpen(false);
      });
    }
  };

  return (
    <Card sx={forumStyles.cardWrapper}>
      <Box sx={forumStyles.mainTitleWrapper}>
        <Typography variant="h1" color="primary" sx={forumStyles.mainTitle}>
          {FORUM_TEXT}
        </Typography>
        <Tooltip title={ADD_BUTTON} placement="left-end">
          <IconButton onClick={() => setOpen(true)}>
            <Add />
          </IconButton>
        </Tooltip>
      </Box>
      <Typography variant="h5" color="primary" align="center" sx={{ mb: 3 }}>
        {forum?.title}
      </Typography>
      <Grid container padding="0 0 16px 0">
        <Grid item xs={1} />
        <Grid item xs={8}>
          <Typography component="div" sx={forumStyles.title}>
            {TITLE_THREADS}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography component="div" sx={forumStyles.title}>
            {TITLE_ANSWER}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Box sx={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
        <Forum items={forum?.threads || []} loading={loading} />
      </Box>
      <FormDialog<CreateThreadModel>
        title={ADD_BUTTON}
        open={open}
        onClose={setOpen}
        onSubmit={handleSubmit}
        validationSchema={createThreadValidationSchema}
      >
        {(register, formState) => {
          return (
            <Stack direction="column" spacing={2}>
              <TextField
                type="text"
                {...register('name')}
                id="name"
                label={NAME_FIELD_LABEL}
                autoFocus
                error={!!formState.errors?.name}
                helperText={formState.errors.name?.message || ' '}
              />
              <TextField
                type="text"
                {...register('description')}
                id="description"
                multiline
                maxRows={4}
                label={DESCRIPTION_FIELD_LABEL}
                error={!!formState.errors?.description}
                helperText={formState.errors.description?.message || ' '}
              />
            </Stack>
          );
        }}
      </FormDialog>
    </Card>
  );
};
