declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SITE_LABEL: string;
    }
  }
}

export {};
