import { FC, ReactElement } from 'react';
import { Box, Container, Paper, Theme, Typography } from '@mui/material';

export interface DefaultLayoutProps {
  headerTitle?: string | ReactElement;
  headerHeight: number;
}

export const DefaultLayout: FC<DefaultLayoutProps> = (props) => {
  return (
    <Box>
      <Box
        sx={{
          height: `${props.headerHeight}vh`,
          background:
            'rgba(0, 0, 0, 0) url("https://rmt.dogedoge.com/fetch/fluid/storage/bg/1cm6iu.png?w=1920&fmt=webp") no-repeat scroll center center / cover',
        }}
      >
        <Box
          sx={{
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {props.headerTitle &&
            (typeof props.headerTitle === 'string' ? (
              <Typography
                sx={{
                  fontSize: '2.5rem',
                  fontWeight: 500,
                  lineHeight: 1.2,
                  color: 'common.white',
                }}
              >
                {props.headerTitle}
              </Typography>
            ) : (
              props.headerTitle
            ))}
        </Box>
      </Box>
      <Container
        sx={{
          maxWidth: (theme: Theme) => ({
            sm: theme.contentWidthScale * theme.breakpoints.values.sm,
            md: theme.contentWidthScale * theme.breakpoints.values.md,
            lg: theme.contentWidthScale * theme.breakpoints.values.lg,
          }),
        }}
      >
        <Paper
          elevation={18}
          sx={{
            padding: '2rem',
            marginTop: '-2rem',
            minHeight: `${100 - props.headerHeight}vh`,
            borderRadius: '0.5rem',
          }}
        >
          {props.children}
        </Paper>
      </Container>
    </Box>
  );
};
