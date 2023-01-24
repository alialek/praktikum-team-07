import React, { Fragment } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Grid,
  Avatar,
  Divider,
  Typography,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { Loader } from '@/components/Loader';
import { NoResults } from '@/components/NoResults';
import { ForumPagePath } from '@/router/paths';
import { ForumModel } from '@/models/forum.model';

interface ForumsItemsProps {
  items: ForumModel[];
  loading: boolean;
}

export const Forums: React.FC<ForumsItemsProps> = ({ items, loading }) => {
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
                <Grid item xs={9}>
                  <Link
                    style={{ textDecoration: 'none' }}
                    to={`${ForumPagePath.path}/${value.id}`}
                  >
                    <ListItemText
                      disableTypography
                      primary={
                        <Typography
                          fontWeight={'600'}
                          variant="body2"
                          color="text.secondary"
                        >
                          {value.title}
                        </Typography>
                      }
                      secondary={
                        <Typography color="text.secondary">
                          {value.description}
                        </Typography>
                      }
                    />
                  </Link>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body2" component="div">
                    {value.threadCount}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body2" component="div">
                    {value.messageCount}
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
