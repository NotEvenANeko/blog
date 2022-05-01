import { Typography, styled } from '@mui/material';

export const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 500,
  lineHeight: 1.2,
  color: theme.palette.common.white,
}));
