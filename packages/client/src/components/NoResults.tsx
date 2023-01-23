import { Box, Typography } from '@mui/material';

import { NO_RESULTS } from '@/сonstants/text';

export const NoResults = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        flex: 1,
      }}
    >
      <Typography>{NO_RESULTS}</Typography>
    </Box>
  );
};
