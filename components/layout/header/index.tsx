import { FC } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Home, Inventory } from '@mui/icons-material';
import { HeaderButton } from './headerBtn';
import { Spacing } from 'components/common';

interface AppHeaderListProps {
  fold?: boolean;
}

const AppHeaderListContainer = styled(Box)`
  height: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const AppHeaderList: FC<AppHeaderListProps> = () => {
  return (
    <AppHeaderListContainer>
      <HeaderButton href="#" icon={<Home />} label="首页" />
      <Spacing spacing="1rem" direction="row" />
      <HeaderButton href="#" icon={<Inventory />} label="归档" />
    </AppHeaderListContainer>
  );
};

const AppHeaderContainer = styled(Box)`
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 15%;
  padding-right: 15%;
  background-color: #2f4155;
  height: 3.25rem;
  color: #ffffff;
`;

const AppHeaderLabel = styled(Typography)`
  font-weight: bold;
  font-size: 1.25rem;
`;

export const AppHeader: FC = () => {
  return (
    <AppHeaderContainer sx={{ boxShadow: 1 }}>
      <AppHeaderLabel>TEST</AppHeaderLabel>
      <AppHeaderList />
    </AppHeaderContainer>
  );
};
