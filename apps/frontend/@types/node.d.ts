declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GATEWAY_BACKEND: string;
    }
  }
}

export {};
