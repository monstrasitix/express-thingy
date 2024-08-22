declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      CONN_STRING: string;
    }
  }
}

export {};
