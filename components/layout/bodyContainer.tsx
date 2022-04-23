import { Container, Theme, Paper } from '@mui/material';
import { type FC, useState, useEffect } from 'react';
import { throttle } from 'throttle-debounce';

import type { DefaultLayoutProps } from './defaultLayout';

export const BodyContainer: FC<DefaultLayoutProps> = (props) => {
  const [paperMarginTop, setPaperMarginTop] = useState(2);

  useEffect(() => {
    const onScroll = throttle(10, () => {
      setPaperMarginTop((cur) => {
        return document.documentElement.scrollTop +
          document.documentElement.clientHeight +
          0.1 * window.innerHeight >
          document.documentElement.scrollHeight
          ? cur
          : Math.min(
              6,
              ((document.documentElement.clientHeight -
                (props.headerHeight / 100) * window.innerHeight +
                document.documentElement.scrollTop) /
                (0.8 * window.innerHeight)) *
                6
            );
      });
    });
    onScroll();
    document.addEventListener('scroll', onScroll);
    return () => document.removeEventListener('scroll', onScroll);
  }, [props.headerHeight]);

  return (
    <Container
      sx={{
        maxWidth: (theme: Theme) => ({
          sm: theme.contentWidthScale * theme.breakpoints.values.sm,
          md: theme.contentWidthScale * theme.breakpoints.values.md,
          lg: theme.contentWidthScale * theme.breakpoints.values.lg,
        }),
        padding: {
          xs: 0,
          sm: 'initial',
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
          minHeight: `${100 - props.headerHeight}vh`,
          borderRadius: '0.5rem',
          display: 'flex',
        }}
      >
        {props.children}
      </Paper>
    </Container>
  );
};
