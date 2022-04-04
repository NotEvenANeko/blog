import { FC } from 'react';
import { Box } from '@mui/material';

import { AppHeader } from './header';

export const AppLayout: FC = ({ children }) => {
  return (
    <>
      <AppHeader />
      <Box sx={{ paddingTop: '4rem' }}>{children}</Box>
    </>
  );
};

export { AppHeader };
