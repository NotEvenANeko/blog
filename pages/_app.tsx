import '../styles/globals.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';

import { AppLayout } from 'components/layout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2f4155',
    },
  },
  contentWidthScale: 0.95,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ThemeProvider>
  );
}

export default MyApp;
