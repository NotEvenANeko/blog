declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SITE_LABEL: string;
    }
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    contentWidthScale: number;
  }

  interface ThemeOptions {
    contentWidthScale?: number;
  }
}

export {};
