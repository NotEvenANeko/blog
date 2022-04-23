import { Box, styled } from '@mui/material';

export const LinkContainer = styled(Box)(({ theme }) => ({
  transition: theme.transitions.create(['color'], {
    duration: theme.transitions.duration.short,
  }),
  cursor: 'pointer',
  '&:hover': {
    color: '#30a9de',
    transition: theme.transitions.create(['color'], {
      duration: theme.transitions.duration.short,
    }),
  },
}));
