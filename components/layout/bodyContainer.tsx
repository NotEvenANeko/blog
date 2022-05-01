import { Container, Theme, Paper } from '@mui/material';
import { type FC, useState, useEffect } from 'react';
import { throttle } from 'throttle-debounce';

import type { DefaultLayoutProps } from './defaultLayout';

export const BodyContainer: FC<DefaultLayoutProps> = ({
  headerHeight,
  children,
}) => {
  const [paperMarginTop, setPaperMarginTop] = useState(2);

  useEffect(() => {
    console.log('triggered');
    const calculateMarginTop = () =>
      Math.min(
        6,
        ((document.documentElement.clientHeight -
          (headerHeight / 100) * window.innerHeight +
          document.documentElement.scrollTop) /
          (0.8 * window.innerHeight)) *
          6
      );
    const onScroll = throttle(10, (ev?: Event) => {
      if (!ev) setPaperMarginTop(calculateMarginTop());
      else
        setPaperMarginTop((cur) => {
          return document.documentElement.scrollTop +
            document.documentElement.clientHeight +
            0.1 * window.innerHeight >
            document.documentElement.scrollHeight
            ? cur
            : calculateMarginTop();
        });
    });
    onScroll();
    document.addEventListener('scroll', onScroll);
    return () => document.removeEventListener('scroll', onScroll);
  }, [headerHeight]);

  return (
    <Container
      sx={{
        maxWidth: (theme: Theme) => ({
          sm: theme.contentWidthScale * theme.breakpoints.values.sm,
          md: theme.contentWidthScale * theme.breakpoints.values.md,
          lg: theme.contentWidthScale * theme.breakpoints.values.lg,
        }),
        padding: {
          xs: '0 0 2rem 0',
          sm: 'initial initial 2rem initial',
        },
      }}
    >
      <Paper
        elevation={18}
        sx={{
          padding: '2rem',
          marginTop: {
            xs: '0',
            sm: `-${paperMarginTop}rem`,
          },
          minHeight: `${100 - headerHeight}vh`,
          borderRadius: '0.5rem',
          display: 'flex',
        }}
      >
        {children}
      </Paper>
    </Container>
  );
};
