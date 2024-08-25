/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GATEWAY_BACKEND: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
