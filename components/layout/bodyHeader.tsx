import { Box, Typography } from '@mui/material';
import type { FC } from 'react';

import type { DefaultLayoutProps } from './defaultLayout';

export const BodyHeader: FC<Omit<DefaultLayoutProps, 'children'>> = (props) => (
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
);
