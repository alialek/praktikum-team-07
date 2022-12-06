import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Grid,
  Avatar,
  FormGroup,
  IconButton,
  Divider,
  Typography,
} from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { AccountCircle } from '@mui/icons-material';
import { ForumItem } from './types';

interface ForumItemsProps {
  items: ForumItem[];
}

export const Forum: React.FC<ForumItemsProps> = ({ items }) => {
  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <List>
          {items.map((value: ForumItem) => (
            <>
              <ListItem key={value.id}>
                <Grid item md={1}>
                  <ListItemAvatar>
                    <Avatar>
                      <AccountCircle htmlColor="#bdbdbd" fontSize="large" />
                    </Avatar>
                  </ListItemAvatar>
                </Grid>
                <Grid item md={5}>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography fontWeight={'600'} variant="body2">
                        {value.title}
                      </Typography>
                    }
                    secondary={value.description}
                  />
                </Grid>
                <Grid item md={3}>
                  <FormGroup row>
                    <Grid item md={10} sx={{ mt: 'auto', mb: 'auto' }}>
                      <Typography variant="body2" align="right" component="div">
                        {value.threads}
                      </Typography>
                    </Grid>
                    <Grid item md={2}>
                      <IconButton aria-label="add" color="primary" sx={{ ml: '10px' }}>
                        <ControlPointIcon />
                      </IconButton>
                    </Grid>
                  </FormGroup>
                </Grid>
                <Grid item md={3}>
                  <Typography variant="body2" align="right" component="div">
                    {value.total_answer}
                  </Typography>
                </Grid>
              </ListItem>
              <Divider light />
            </>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};
