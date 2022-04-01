import { Box, styled, Typography } from '@mui/material';
import { Spacing } from 'components/common';
import Link from 'next/link';
import { FC, ReactElement } from 'react';

export interface HeaderButtonProps {
  href: string;
  icon: ReactElement;
  label: string;
}

const ButtonWrapper = styled(Box)`
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const LinkWrapper = styled(Box)`
  border-radius: 5px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.2s, color 0.2s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: #30a9de;
    transition: background-color 0.2s, color 0.2s;
  }
`;

export const HeaderButton: FC<HeaderButtonProps> = (props) => {
  return (
    <ButtonWrapper>
      <Link href={props.href} passHref>
        <LinkWrapper>
          {props.icon}
          <Spacing spacing="0.2rem" direction="row" />
          <Typography sx={{ textAlign: 'center', fontSize: '0.9rem' }}>
            {props.label}
          </Typography>
        </LinkWrapper>
      </Link>
    </ButtonWrapper>
  );
};
