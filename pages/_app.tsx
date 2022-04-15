import '../styles/globals.css';
import { FC, ReactElement, ReactNode } from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';

import { AppLayout, DefaultLayout } from 'components/layout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2f4155',
    },
    text: {
      primary: '#3c4858',
      secondary: '#718096',
    },
  },
  typography: {
    fontSize: 16,
  },
  contentWidthScale: 0.95,
});

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
  headerTitle?: string | ReactElement;
  headerHeight?: number;
  activeFab?: boolean;
};

interface AppWithLayoutProps extends AppProps {
  Component: NextPageWithLayout<unknown>;
}

const MyApp: FC<AppWithLayoutProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>Create Next App</title>
        <meta
          name="viewport"
          content="width=device-width, viewport-fit=cover"
        />
      </Head>
      <AppLayout
        fabActiveHeight={
          Component.activeFab === false
            ? undefined
            : Component.headerHeight ?? 55
        }
      >
        {Component.getLayout ? (
          Component.getLayout(<Component {...pageProps} />)
        ) : (
          <DefaultLayout
            headerTitle={Component.headerTitle}
            headerHeight={Component.headerHeight ?? 55}
          >
            <Component {...pageProps} />
          </DefaultLayout>
        )}
      </AppLayout>
    </ThemeProvider>
  );
};

export default MyApp;
