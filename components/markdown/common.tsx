import { FC, HTMLAttributes, useState, MouseEventHandler } from 'react';
import { Typography, SxProps } from '@mui/material';

import { HTitleLinkIcon } from './linkIcon';

export interface HTitleCommonProps extends HTMLAttributes<HTMLHeadingElement> {
  variant: `h${'1' | '2' | '3' | '4' | '5' | '6'}`;
  sx?: SxProps;
}

export const HTitleCommon: FC<HTitleCommonProps> = ({
  variant,
  children,
  sx,
  ...props
}) => {
  const [hover, setHover] = useState(false);

  const handleMouseEnter: MouseEventHandler<HTMLHeadingElement> = () => {
    setHover(true);
  };

  const handleMouseLeave: MouseEventHandler<HTMLHeadingElement> = () => {
    setHover(false);
  };

  return (
    <Typography
      variant={variant}
      component={variant}
      sx={{
        marginBottom: '0.75em',
        marginTop: '2em',
        width: '100%',
        fontWeight: 'bold',
        color: '#1a202c',
        lineHeight: '1.25',
        '&::before': {
          display: 'block',
          content: '""',
          marginTop: '-5rem',
          height: '5rem',
          width: '1px',
          visibility: 'hidden',
        },
        ...sx,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <>
        <HTitleLinkIcon id={props.id} in={hover} />
        {children}
      </>
    </Typography>
  );
};
