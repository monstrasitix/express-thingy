import type { Express } from "express";
import cors from "cors";
import { setupRouter } from "@/api/router";

type ServerConfig = {
  port: string;
};

export function setupServer(app: Express, config: ServerConfig) {
  app.use(
    cors({
      methods: ["GET"],
    }),
  );

  setupRouter(app);

  app.listen(config.port, function () {
    console.log(`Listening on: http://localhost:${config.port}`);
  });
}
