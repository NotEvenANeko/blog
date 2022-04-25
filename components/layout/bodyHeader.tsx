import { Box } from '@mui/material';
import type { FC } from 'react';

import type { DefaultLayoutProps } from './defaultLayout';
import { HeaderTitle } from './headerTitle';

export const BodyHeader: FC<Omit<DefaultLayoutProps, 'children'>> = (props) => (
  <Box
    sx={{
      height: `${props.headerHeight}vh`,
      background: `rgba(0, 0, 0, 0) url("${
        props.headerBanner ||
        process.env.NEXT_PUBLIC_HEADER_PICTURE_FALLBACK ||
        'http://api.dujin.org/bing/1920.php'
      }") no-repeat scroll center center / cover`,
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
          <HeaderTitle>{props.headerTitle}</HeaderTitle>
        ) : (
          props.headerTitle
        ))}
    </Box>
  </Box>
);
