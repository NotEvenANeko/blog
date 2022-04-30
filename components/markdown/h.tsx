import type { FC, HTMLAttributes } from 'react';

import { HTitleCommon } from './common';

export const H1Title: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => (
  <HTitleCommon variant="h1" {...props}>
    {children}
  </HTitleCommon>
);

export const H2Title: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => (
  <HTitleCommon
    variant="h2"
    sx={{
      fontSize: '1.5em',
      borderBottom: '1px solid #eaecef',
      paddingBottom: '0.3em',
    }}
    {...props}
  >
    {children}
  </HTitleCommon>
);

export const H3Title: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => (
  <HTitleCommon
    variant="h3"
    sx={{
      fontSize: '1.25em',
    }}
    {...props}
  >
    {children}
  </HTitleCommon>
);

export const H4Title: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => (
  <HTitleCommon
    variant="h4"
    sx={{
      fontSize: '1em',
    }}
    {...props}
  >
    {children}
  </HTitleCommon>
);

export const H5Title: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => (
  <HTitleCommon variant="h5" {...props}>
    {children}
  </HTitleCommon>
);

export const H6Title: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => (
  <HTitleCommon variant="h6" {...props}>
    {children}
  </HTitleCommon>
);
