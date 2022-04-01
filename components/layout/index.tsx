import { FC } from 'react';
import { Box } from '@mui/material';

import { AppHeader } from './header';

export const AppLayout: FC = ({ children }) => {
  return (
    <>
      <AppHeader />
      <Box sx={{ paddingTop: '3.25rem' }}>{children}</Box>
    </>
  );
};

export { AppHeader };
