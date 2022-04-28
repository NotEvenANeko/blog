import { FC, useState, useEffect, useCallback, ReactNode } from 'react';
import { Box, Theme, Slide, Fab } from '@mui/material';
import { ExpandLess } from '@mui/icons-material';
import { throttle } from 'throttle-debounce';

import { AppHeader } from './header';

export interface AppLayoutProps {
  fabActiveHeight?: number;
  children: ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = (props) => {
  const [fabShow, setFabShow] = useState(false);

  useEffect(() => {
    const onScroll = throttle(50, () => {
      setFabShow(
        () =>
          !!props.fabActiveHeight &&
          document.documentElement.scrollTop >
            (props.fabActiveHeight / 100) * window.innerHeight
      );
    });
    onScroll();
    document.addEventListener('scroll', onScroll);
    return () => document.removeEventListener('scroll', onScroll);
  }, [props.fabActiveHeight]);

  const handleFabClick = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      <AppHeader />
      <Box
        sx={{
          backgroundColor: (theme: Theme) => theme.palette.grey[200],
          minHeight: '100vh',
        }}
      >
        {props.children}
      </Box>
      <Slide direction="up" in={fabShow}>
        <Fab
          size="medium"
          onClick={handleFabClick}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            borderRadius: '4px',
            backgroundColor: 'common.white',
          }}
        >
          <ExpandLess fontSize="large" />
        </Fab>
      </Slide>
    </>
  );
};
