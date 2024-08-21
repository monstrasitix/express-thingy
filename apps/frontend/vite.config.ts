// vite.config.ts
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";

console.log(process.env);

export default defineConfig({
  plugins: [solidPlugin(), tsconfigPaths()],
  server: {
    host: true,
    port: 8080,
  },
});
