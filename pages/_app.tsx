import '../styles/globals.css';
import { FC, ReactElement, ReactNode } from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';

import { AppLayout, DefaultLayout } from 'components/layout';

import '../styles/prism.light.css';

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
    fontSize: 14,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 800,
      lg: 1200,
      xl: 1500,
    },
  },
  contentWidthScale: 0.95,
});

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement, props: unknown) => ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headerTitle?: string | FC<any>;
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
        <title>{process.env.NEXT_PUBLIC_SITE_TITLE ?? 'Next.js blog'}</title>
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
          Component.getLayout(<Component {...pageProps} />, pageProps)
        ) : (
          <DefaultLayout
            headerTitle={
              typeof Component.headerTitle === 'string' ||
              !Component.headerTitle ? (
                Component.headerTitle
              ) : (
                <Component.headerTitle {...pageProps} />
              )
            }
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
