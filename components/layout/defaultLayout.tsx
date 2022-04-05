import { FC } from 'react';
import { Box, Container, Paper, Theme } from '@mui/material';

export const DefaultLayout: FC = ({ children }) => {
  return (
    <Box>
      <Box
        sx={{
          height: '55vh',
          background:
            'rgba(0, 0, 0, 0) url("https://rmt.dogedoge.com/fetch/fluid/storage/bg/1cm6iu.png?w=1920&fmt=webp") no-repeat scroll center center / cover',
        }}
      >
        <Box
          sx={{
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        ></Box>
      </Box>
      <Container
        sx={{
          maxWidth: (theme: Theme) => ({
            sm: theme.contentWidthScale * theme.breakpoints.values.sm,
            md: theme.contentWidthScale * theme.breakpoints.values.md,
            lg: theme.contentWidthScale * theme.breakpoints.values.lg,
          }),
          //height: '100%',
        }}
      >
        <Paper
          elevation={18}
          sx={{
            padding: '2rem',
            marginTop: '-2rem',
            minHeight: '45vh',
            borderRadius: '0.5rem',
          }}
        >
          {children}
        </Paper>
      </Container>
    </Box>
  );
};
