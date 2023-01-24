import React, { Fragment } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  Grid,
  Avatar,
  Divider,
  Typography,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

import { Loader } from '@/components/Loader';
import { NoResults } from '@/components/NoResults';
import { MessageModel } from '@/models/forum.model';

interface ThreadItemsProps {
  items: MessageModel[];
  loading: boolean;
}

export const Thread: React.FC<ThreadItemsProps> = ({ items, loading }) => {
  if (loading) {
    return <Loader />;
  }

  if (!loading && !items.length) {
    return <NoResults />;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <List>
          {items.map((value) => (
            <Fragment key={value.id}>
              <ListItem sx={{ px: 0 }}>
                <Grid item xs={1}>
                  <ListItemAvatar>
                    <Avatar>
                      <AccountCircle htmlColor="#bdbdbd" fontSize="large" />
                    </Avatar>
                  </ListItemAvatar>
                </Grid>
                <Grid item xs={2}>
                  <Typography fontWeight={'600'} variant="body2">
                    {value.nickname}
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body2" component="div">
                    {value.message}
                  </Typography>
                </Grid>
              </ListItem>
              <Divider light />
            </Fragment>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};
