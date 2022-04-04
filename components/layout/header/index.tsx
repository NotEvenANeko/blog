import { FC, useState, useMemo, useCallback } from 'react';
import {
  Box,
  Typography,
  AppBar,
  Container,
  Theme,
  Toolbar,
  MenuItem,
  Button,
  Stack,
  IconButton,
  MenuList,
  Collapse,
  ClickAwayListener,
} from '@mui/material';
import { Home, Inventory, Menu as MenuIcon } from '@mui/icons-material';
import Link from 'next/link';

export const AppHeader: FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = useCallback(
    (value?: boolean) => () => {
      setOpen((open) =>
        value === undefined || value === null ? !open : value
      );
    },
    []
  );

  const NavList = useMemo(
    () => [
      {
        uri: '/',
        icon: <Home />,
        label: '首页',
      },
      {
        uri: '/archives',
        icon: <Inventory />,
        label: '归档',
      },
    ],
    []
  );

  const processNavList = useCallback(
    (disableInnerRipple?: boolean) =>
      NavList.map((item, index) => (
        <Link href={item.uri} key={index} passHref>
          <Button
            disableRipple={!!disableInnerRipple}
            startIcon={item.icon}
            sx={{
              color: 'primary.contrastText',
              '& .MuiButton-startIcon': {
                marginRight: 0.5,
              },
            }}
          >
            <Typography>{item.label}</Typography>
          </Button>
        </Link>
      )),
    [NavList]
  );

  return (
    <ClickAwayListener onClickAway={handleOpenChange(false)}>
      <AppBar position="fixed">
        <Container
          sx={{
            maxWidth: (theme: Theme) => ({
              sm: theme.contentWidthScale * theme.breakpoints.values.sm,
              md: theme.contentWidthScale * theme.breakpoints.values.md,
              lg: theme.contentWidthScale * theme.breakpoints.values.lg,
            }),
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6">TEST</Typography>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                display: {
                  xs: 'none',
                  md: 'block',
                },
              }}
            >
              {processNavList()}
            </Stack>

            <Box
              sx={{
                display: {
                  xs: 'block',
                  md: 'none',
                },
              }}
            >
              <IconButton
                onClick={handleOpenChange()}
                sx={{
                  color: 'primary.contrastText',
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>

          <Collapse
            in={open}
            sx={{
              display: {
                xs: 'block',
                md: 'none',
              },
            }}
          >
            <MenuList>
              {processNavList(true).map((item, index) => (
                <MenuItem
                  key={index}
                  sx={{
                    '& a': {
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    },
                  }}
                >
                  {item}
                </MenuItem>
              ))}
            </MenuList>
          </Collapse>
        </Container>
      </AppBar>
    </ClickAwayListener>
  );
};
