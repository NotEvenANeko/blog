import type { FC } from 'react';
import { Box, Fade } from '@mui/material';
import { Link as LinkIcon } from '@mui/icons-material';

interface HTitleLinkIconProps {
  id?: string;
  in?: boolean;
}

export const HTitleLinkIcon: FC<HTitleLinkIconProps> = ({
  id,
  in: show = false,
}) => (
  <Fade in={show}>
    <Box
      component="a"
      href={`#${id ?? ''}`}
      sx={{
        position: 'absolute',
        marginLeft: '-1em',
        paddingRight: 1,
        fontSize: '1em',
      }}
    >
      <LinkIcon
        sx={{
          transform: 'rotate(-45deg)',
          transformOrigin: 'center center',
          fontSize: '1em',
          marginTop: '10%',
        }}
      />
    </Box>
  </Fade>
);
