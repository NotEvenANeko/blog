declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SITE_TITLE: string;
      NEXT_PUBLIC_MAIN_HEADER: string;
      NEXT_PUBLIC_SITE_DESC: string;
      NEXT_PUBLIC_HEADER_TEXT: string;
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
