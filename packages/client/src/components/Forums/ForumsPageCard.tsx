import { useState } from 'react';
import {
  Typography,
  Card,
  Divider,
  Grid,
  Box,
  TextField,
  Stack,
  Tooltip,
  IconButton,
} from '@mui/material';
import { Add } from '@mui/icons-material';

import { FORUM_TEXT } from '@/сonstants/text';
import {
  TITLE_FORUMS,
  TITLE_ANSWER,
  TITLE_THREADS,
  ADD_BUTTON,
  TITLE_FIELD_LABEL,
  DESCRIPTION_FIELD_LABEL,
} from '@/сonstants/forumsPageText';
import { forumsStyles } from './Styles';
import { Forums } from './Forums';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { FormDialog } from '../FormDialog';
import { createForumValidationSchema } from '@/utils/formValidation';
import { CreateForumModel } from '@/models/forum.model';
import { createForum } from '@/store/forum/forum.actions';

export const ForumsPageCard = () => {
  const dispatch = useAppDispatch();

  const { forums, loading } = useAppSelector((state) => state.forum);
  const [open, setOpen] = useState(false);

  const handleSubmit = (forum: CreateForumModel) => {
    dispatch(createForum(forum)).then(() => {
      setOpen(false);
    });
  };

  return (
    <Card sx={forumsStyles.cardWrapper}>
      <Box sx={forumsStyles.mainTitleWrapper}>
        <Typography variant="h1" color="primary" sx={forumsStyles.mainTitle}>
          {FORUM_TEXT}
        </Typography>
        <Tooltip title={ADD_BUTTON} placement="left-end">
          <IconButton onClick={() => setOpen(true)}>
            <Add />
          </IconButton>
        </Tooltip>
      </Box>
      <Grid container padding="0 0 16px 0">
        <Grid item xs={1} />
        <Grid item xs={9}>
          <Typography component="div" sx={forumsStyles.title}>
            {TITLE_FORUMS}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography component="div" sx={forumsStyles.title}>
            {TITLE_THREADS}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography component="div" sx={forumsStyles.title}>
            {TITLE_ANSWER}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Box sx={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
        <Forums items={forums} loading={loading} />
      </Box>
      <FormDialog<CreateForumModel>
        title={ADD_BUTTON}
        open={open}
        onClose={setOpen}
        onSubmit={handleSubmit}
        validationSchema={createForumValidationSchema}
      >
        {(register, formState) => {
          return (
            <Stack direction="column" spacing={2}>
              <TextField
                type="text"
                {...register('title')}
                id="title"
                label={TITLE_FIELD_LABEL}
                autoFocus
                error={!!formState.errors?.title}
                helperText={formState.errors.title?.message || ' '}
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
