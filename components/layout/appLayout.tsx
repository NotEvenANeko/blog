import { FC } from 'react';
import { Box, Theme } from '@mui/material';

import { AppHeader } from './header';

export const AppLayout: FC = ({ children }) => {
  return (
    <>
      <AppHeader />
      <Box
        sx={{
          backgroundColor: (theme: Theme) => theme.palette.grey[200],
          paddingBottom: '2rem',
        }}
      >
        {children}
      </Box>
    </>
  );
};
